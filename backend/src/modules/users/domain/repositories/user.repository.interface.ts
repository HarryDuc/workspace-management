import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  updateUser(id: string, dataUser: Partial<UserEntity>): Promise<UserEntity | null>;
  updatePassword(email: string, currentPassword: string, newPassword: string, comfirmPassword: string): Promise<void | null>;
  save(user: UserEntity): Promise<void>;
}
