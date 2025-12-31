import { AuthEntity } from "../entities/auth.entity";

export interface IAuthRepository {
  findByEmail(email: string): Promise<AuthEntity | null>;
  register(user: AuthEntity): Promise<void>;
  login(email: string, password: string): Promise<{ token: string; user: AuthEntity } | null>;
  verifyEmail(token: string): Promise<AuthEntity | null>;
  refreshToken(refreshToken: string, accessToken: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  verifyResetPassword(token: string): Promise<AuthEntity | null>;
}
