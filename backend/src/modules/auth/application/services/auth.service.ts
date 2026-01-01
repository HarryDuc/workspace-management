import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { AuthEntity } from '../../domain/entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: IAuthRepository,
  ) {}

  async register(createAuthDto: AuthEntity): Promise<void> {
    const user = await this.authRepository.findByEmail(createAuthDto.email);
    if (user) throw new NotFoundException('User already exists');

    await this.authRepository.register(createAuthDto);
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.login(email, password);
    if (!user) throw new NotFoundException('Invalid credentials');
    return user;
  }

  async verifyEmail(token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }
    return this.authRepository.verifyEmail(token);
  }

  async refreshToken(refreshToken: string, accessToken: any) {
    return `This action updates auth`;
  }

  async resetPassword(email: string) {
    return this.authRepository.resetPassword(email);
  }

  async verifyResetPassword(
    token: string,
    password: string,
    confirmPassword: string,
  ) {
    return this.authRepository.verifyResetPassword(
      token,
      password,
      confirmPassword,
    );
  }
}
