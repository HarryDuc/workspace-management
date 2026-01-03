import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.save(user);
  }

  async updatePassword(
    id: string,
    body: {
      currentPassword: string;
      newPassword: string;
      comfirmNewPassword: string;
    },
  ): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) return;

    await this.userRepository.save(user);
  }
}
