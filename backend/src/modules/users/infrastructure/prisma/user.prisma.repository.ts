import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from '@/src/prisma/prisma.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
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
    email: string,
    newPassword: string,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.update({
      where: { email },
      data: {
        password: newPassword,
      },
    });
    if (!user) {
      throw new Error('User update password failed');
    }
    return user ? UserMapper.toEntity(user) : null;
  }

  async save(user: UserEntity): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: UserMapper.toPersistence(user),
    });
  }
}
