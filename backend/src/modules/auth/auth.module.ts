import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './presentation/auth.controller';
import { AuthPrismaRepository } from './infrastructure/prisma/auth.prisma.repository';
import { MailService } from '@/src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    JwtService,
    {
      provide: 'AuthRepository',
      useClass: AuthPrismaRepository,
    },
  ],
})
export class AuthModule {}
