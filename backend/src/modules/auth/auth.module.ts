import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './presentation/auth.controller';
import { AuthPrismaRepository } from './infrastructure/prisma/auth.prisma.repository';
import { MailService } from '@/src/mail/mail.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    {
      provide: 'AuthRepository',
      useClass: AuthPrismaRepository,
    },
  ],
})
export class AuthModule {}
