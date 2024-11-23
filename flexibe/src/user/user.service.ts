import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './User';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { UserAlreadyRegisteredException } from './user.exception';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  getAll() {
    return this.userRepository.getAll();
  }

  get(id: number) {
    return this.userRepository.get(id);
  }

  async create(data: CreateUserDTO) {
    const user = await this.userRepository.getByEmail(data.email);

    if (user) {
      throw new UserAlreadyRegisteredException();
    }

    return this.userRepository.create(data);
  }

  update(id: number, data: UpdateUserDTO) {
    return this.userRepository.update(id, data);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}

export default interface IUserService {
  get: (id: number) => Promise<User>;
  getAll: () => Promise<User[]>;
  create: (data: CreateUserDTO) => Promise<User>;
  update: (id: number, data: UpdateUserDTO) => Promise<User>;
  delete: (id: number) => Promise<void>;
}
