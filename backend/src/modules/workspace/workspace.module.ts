import { Module } from '@nestjs/common';
import { MailService } from '@/src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { WorkspaceController } from './presentation/workspace.controller';
import { WorkspacePrismaRepository } from './infrastructure/prisma/workspace.prisma.repository';
import { WorkspaceService } from './application/services/workspace.service';

@Module({
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    MailService,
    JwtService,
    {
      provide: 'WorkspaceRepository',
      useClass: WorkspacePrismaRepository,
    },
  ],
})

export class WorkspaceModule {}
