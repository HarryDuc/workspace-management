import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../../domain/repositories/user.repository.interface";

@Injectable()
export class UserService {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async updateUser(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException("User not found");

    await this.userRepository.save(user);
  }

  async updatePassword(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return;

    

    await this.userRepository.save(user);
  }
}
