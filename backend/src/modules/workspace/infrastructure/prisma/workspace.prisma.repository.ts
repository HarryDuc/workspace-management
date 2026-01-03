import { Injectable, Logger } from '@nestjs/common';
import { IWorkspaceRepository } from '../../domain/repositories/workspace.repository.interface';
import { WorkspaceEntity } from '../../domain/entities/workspace.entity';
import { PrismaService } from '@/src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@/src/mail/mail.service';
import { CreateWorkspaceDto } from '../../application/dto/workspace.dto';
import { WorkspaceMapper } from '../mappers/workspace.mapper';

@Injectable()
export class WorkspacePrismaRepository implements IWorkspaceRepository {
  private readonly logger = new Logger(WorkspacePrismaRepository.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    ownerId: string,
  ): Promise<CreateWorkspaceDto | null> {
    try {
      const payload = {
        name: createWorkspaceDto.name,
        description: createWorkspaceDto.description,
        color: createWorkspaceDto.color,
        ownerId: ownerId,
      };
      const createWorkspace = await this.prisma.workspace.create({
        data: {
          ...payload,
        },
      });
      return createWorkspace ? WorkspaceMapper.toEntity(createWorkspace) : null;
    } catch (error) {
      throw new Error('Create workspace failed');
    }
  }
  async getWorkspaces(userId: string): Promise<void | null> {}
  async getWorkspaceDetails(workspaceId: string): Promise<void | null> {}
  async getWorkspaceProjects(workspaceId: string): Promise<void | null> {}
  async getWorkspaceStats(workspaceId: string): Promise<void | null> {}
  async inviteUserToWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<void | null> {}
  async acceptGenerateInvite(
    workspaceId: string,
    userId: string,
  ): Promise<void | null> {}
  async acceptInviteByToken(
    workspaceId: string,
    userId: string,
  ): Promise<void | null> {}
}
