import { CreateWorkspaceDto } from "../../application/dto/workspace.dto";
import { WorkspaceEntity } from "../entities/workspace.entity";

export interface IWorkspaceRepository {
  createWorkspace(createWorkspaceDto: CreateWorkspaceDto, ownerId: string): Promise<CreateWorkspaceDto | null>;
  getWorkspaces(userId: string): Promise<void | null>;
  getWorkspaceDetails(workspaceId: string): Promise<void | null>;
  getWorkspaceProjects(workspaceId: string): Promise<void | null>;
  getWorkspaceStats(workspaceId: string): Promise<void | null>;
  inviteUserToWorkspace(workspaceId: string, userId: string): Promise<void | null>;
  acceptGenerateInvite(workspaceId: string, userId: string): Promise<void | null>;
  acceptInviteByToken(workspaceId: string, userId: string): Promise<void | null>;
}
