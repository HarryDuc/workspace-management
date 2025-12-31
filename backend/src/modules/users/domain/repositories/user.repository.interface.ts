import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  updateUser(email: string, dataUser: Partial<UserEntity>): Promise<UserEntity | null>;
  updatePassword(email: string, newPassword: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<void>;
}
