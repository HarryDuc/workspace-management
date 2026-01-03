import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { AuthEntity } from '../../domain/entities/auth.entity';
import { AuthMapper } from '../mappers/auth.mapper';
import { PrismaService } from '@/src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswordUtils, hashPasswordUtils } from '@/src/utils/hash';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@/src/mail/mail.service';
import { randomNumber } from '@/src/utils/random';

@Injectable()
export class AuthPrismaRepository implements IAuthRepository {
  private readonly logger = new Logger(AuthPrismaRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<AuthEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? AuthMapper.toEntity(user) : null;
  }

  async register(user: AuthEntity): Promise<void> {
    try {
      const hashedPassword = await hashPasswordUtils(user.password);
      user.password = hashedPassword;
      const createdUser = await this.prisma.user.create({
        data: AuthMapper.toPersistence(user),
      });

      const verificationToken = this.jwtService.sign(
        {
          userId: createdUser.id,
          userEmail: user.email,
          purpose: 'email-verification',
        },
        {
          secret: this.configService.get('JWT_EMAIL_VERIFICATION_SECRET'),
          expiresIn: '1h',
        },
      );

      await this.prisma.verification.create({
        data: {
          userId: createdUser.id as string,
          token: verificationToken,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
          createdAt: new Date(),
        },
      });

      // send email
      const randomCode = await randomNumber(6);
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

      const isEmailSent = await this.mailService.sendEmail(
        user.email,
        user.name,
        randomCode,
        verificationLink,
      );

      if (!isEmailSent) {
        throw new Error('Failed to send verification email');
      }

      this.logger.log('Sent verification email');
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: AuthEntity } | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (!user.isEmailVerified) {
        const exitingVerification = await this.prisma.verification.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (exitingVerification && exitingVerification.expiresAt > new Date()) {
          throw new NotFoundException('Email not verified');
        } else {
          await this.prisma.verification.deleteMany({
            where: {
              userId: user.id,
            },
          });

          const verificationToken = this.jwtService.sign(
            {
              userId: user.id,
              userEmail: user.email,
              purpose: 'email-verification',
            },
            {
              secret: this.configService.get('JWT_EMAIL_VERIFICATION_SECRET'),
              expiresIn: '1h',
            },
          );

          await this.prisma.verification.create({
            data: {
              userId: user.id as string,
              token: verificationToken,
              expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
              createdAt: new Date(),
            },
          });

          // send email
          const randomCode = await randomNumber(6);
          const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

          const isEmailSent = await this.mailService.sendEmail(
            user.email,
            user.name,
            randomCode,
            verificationLink,
          );

          if (!isEmailSent) {
            throw new Error('Failed to send verification email');
          }

          this.logger.log('Resent verification email');
        }
      }

      const comparedPassword = await comparePasswordUtils(
        password,
        user.password,
      );

      user.lastLogin = new Date();
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: user.lastLogin },
      });

      if (user && comparedPassword) {
        const token = this.jwtService.sign(
          {
            userId: user.id,
            email: user.email,
            purpose: 'access-token',
          },
          {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN'),
          },
        );
        return { token, user: AuthMapper.toEntity(user) };
      }

      return null;
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  async verifyEmail(token: string): Promise<AuthEntity | null> {
    this.logger.log('Verifying email with token:', token);
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_EMAIL_VERIFICATION_SECRET'),
    }) as {
      userId: string;
      userEmail: string;
      purpose: string;
      iat: number;
      exp: number;
    };

    if (!payload) throw new Error('Unauthorized');
    if (payload.purpose !== 'email-verification')
      throw new Error('Invalid token purpose');

    const verification = await this.prisma.verification.findFirst({
      where: {
        userId: payload.userId,
        token: token,
      },
    });

    if (!verification) {
      throw new Error('Invalid or expired token');
    }

    const isTokenExpired = verification.expiresAt < new Date();

    if (isTokenExpired) {
      throw new Error('Invalid or expired token');
    }

    await this.prisma.verification.deleteMany({
      where: {
        userId: payload.userId,
        token: token,
      },
    });

    await this.prisma.user.update({
      where: { id: payload.userId },
      data: { isEmailVerified: true },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });
    this.logger.log('Email verified successfully');
    return user ? AuthMapper.toEntity(user) : null;
  }

  async resetPassword(email: string): Promise<void> {
    this.logger.log('Initiating password reset for email:', email);
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isEmailVerified) {
      throw new Error('Email not verified');
    }

    const existingVerification = await this.prisma.verification.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (existingVerification && existingVerification.expiresAt > new Date()) {
      throw new Error('A reset password request is already pending');
    }

    if (existingVerification && existingVerification.expiresAt < new Date()) {
      await this.prisma.verification.deleteMany({
        where: {
          userId: user.id,
        },
      });
    }

    const resetToken = this.jwtService.sign(
      {
        userId: user.id,
        userEmail: user.email,
        purpose: 'reset-password',
      },
      {
        secret: this.configService.get('JWT_PASSWORD_RESET_SECRET'),
        expiresIn: '1h',
      },
    );

    await this.prisma.verification.create({
      data: {
        userId: user.id as string,
        token: resetToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        createdAt: new Date(),
      },
    });

    const randomCode = await randomNumber(6);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const isEmailSent = await this.mailService.sendEmail(
      user.email,
      user.name,
      randomCode,
      resetLink,
    );

    if (!isEmailSent) {
      throw new Error('Failed to send reset password email');
    }
    this.logger.log('Sent reset password email');
  }

  async verifyResetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_PASSWORD_RESET_SECRET'),
    }) as {
      userId: string;
      userEmail: string;
      purpose: string;
      iat: number;
      exp: number;
    };
    if (!payload) throw new Error('Unauthorized');
    if (payload.purpose !== 'reset-password')
      throw new Error('Invalid token purpose');
    const verification = await this.prisma.verification.findFirst({
      where: {
        userId: payload.userId,
        token: token,
      },
    });
    if (!verification) {
      throw new Error('Invalid or expired token');
    }
    const isTokenExpired = verification.expiresAt < new Date();
    if (isTokenExpired) {
      throw new Error('Invalid or expired token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = await hashPasswordUtils(newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await this.prisma.verification.deleteMany({
      where: {
        userId: payload.userId,
        token: token,
      },
    });

    this.logger.log('Password reset successfully');
  }

  async refreshToken(refreshToken: string, accessToken: any): Promise<void> {
    // Implementation for refreshing token goes here
  }
}
