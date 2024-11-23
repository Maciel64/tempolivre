import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from './User';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async get(id: number) {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async update(id: number, data: UpdateUserDTO) {
    return this.prismaService.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async getAll() {
    return this.prismaService.user.findMany();
  }

  async create(data: CreateUserDTO) {
    return this.prismaService.user.create({
      data,
    });
  }
}

export default interface IUserRepository {
  get: (id: number) => Promise<User | null>;
  getByEmail: (email: string) => Promise<User | null>;
  getAll: () => Promise<User[]>;
  create: (data: CreateUserDTO) => Promise<User | null>;
  update: (id: number, data: UpdateUserDTO) => Promise<User | null>;
  delete: (id: number) => Promise<void>;
}
