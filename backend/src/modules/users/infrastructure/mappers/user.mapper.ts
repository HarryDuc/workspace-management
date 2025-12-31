import { User } from "@/src/generated/prisma/client";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserMapper {
  static toEntity(model: User): UserEntity {
    return new UserEntity({
      id: model.id,
      email: model.email,
      name: model.name,
      profilePicture: model.profilePicture ?? undefined,
      isEmailVerified: model.isEmailVerified,
      lastLogin: model.lastLogin ?? undefined,
      is2FAEnabled: model.is2FAEnabled,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toPersistence(entity: UserEntity) {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      profilePicture: entity.profilePicture,
      isEmailVerified: entity.isEmailVerified,
      lastLogin: entity.lastLogin,
      is2FAEnabled: entity.is2FAEnabled,
    };
  }
}
