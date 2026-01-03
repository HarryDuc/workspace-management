import { Injectable, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from '@/src/prisma/prisma.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
    private readonly logger = new Logger(UserPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? UserMapper.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? UserMapper.toEntity(user) : null;
  }

  async updateUser(
    email: string,
    dataUser: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.update({
      where: { email },
      data: {
        ...dataUser,
      },
    });
    if (!user) {
      throw new Error('User update failed');
    }
    return user ? UserMapper.toEntity(user) : null;
  }

  async updatePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('New password and confirm password do not match');
    }

    const userUpdate = await this.prisma.user.update({
      where: { id: id },
      data: {
        password: newPassword,
      },
    });
    if (!userUpdate) {
      throw new Error('User update password failed');
    }
    this.logger.log('Password updated successfully');
  }

  async save(user: UserEntity): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: UserMapper.toPersistence(user),
    });
  }
}
