import { Workspace } from '@/src/generated/prisma/client';
import { WorkspaceEntity } from '../../domain/entities/workspace.entity';

export class WorkspaceMapper {
  static toEntity(model: Workspace): WorkspaceEntity {
    return new WorkspaceEntity({
      name: model.name,
      description: model.description ?? '',
      color: model.color,
      ownerId: model.ownerId,
    });
  }

  static toPersistence(entity: WorkspaceEntity) {
    return {
      name: entity.name,
      description: entity.description,
      color: entity.color,
      ownerId: entity.ownerId,
    };
  }
}
