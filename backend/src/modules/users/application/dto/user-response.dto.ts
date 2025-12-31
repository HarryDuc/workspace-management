import { UserEntity } from "../../domain/entities/user.entity";

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;

  static fromEntity(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      profilePicture: entity.profilePicture,
    };
  }
}
