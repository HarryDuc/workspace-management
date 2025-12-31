import { User } from "@/src/generated/prisma/client";
import { AuthEntity } from "../../domain/entities/auth.entity";

export class AuthMapper {
  static toEntity(model: User): AuthEntity {
    return new AuthEntity({
      email: model.email,
      name: model.name,
      password: model.password,
    });
  }

  static toPersistence(entity: AuthEntity) {
    return {
      email: entity.email,
      name: entity.name,
      password: entity.password,
    };
  }
}
