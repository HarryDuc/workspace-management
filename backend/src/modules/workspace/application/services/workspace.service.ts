import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IWorkspaceRepository } from '../../domain/repositories/workspace.repository.interface';
import { WorkspaceEntity } from '../../domain/entities/workspace.entity';
import { CreateWorkspaceDto } from '../dto/workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject('WorkspaceRepository')
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async createWorkspace(createWorkspace: CreateWorkspaceDto, userId: string) {
    return this.workspaceRepository.createWorkspace(createWorkspace, userId)
  }

}
