import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from '../application/services/workspace.service';
import { WorkspaceEntity } from '../domain/entities/workspace.entity';
import { CreateWorkspaceDto } from '../application/dto/workspace.dto';
import { JwtAuthGuard, RequestWithUser } from '@/src/common/guards/jwt.guard';

@Controller('workspace')
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async createWorkspace(
    @Body() createWorkspace: CreateWorkspaceDto,
    @Request() req: RequestWithUser,
  ) {
    const ownerId = req.user?.userId as string;
    if (!ownerId) {
      throw new BadRequestException('Req userId not found');
    }
    return this.workspaceService.createWorkspace(createWorkspace, ownerId);
  }
}
