import { Test } from '@nestjs/testing';
import IUserRepository, { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { User } from './User';

export const mockedUserRepository: IUserRepository = {
  get: jest.fn(),
  getByEmail: jest.fn(),
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService test suit', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    email: 'joaoninguem@gmail.com',
    firstName: 'João',
    lastName: 'Ninguém',
    id: 2,
    createdAt: new Date(),
    updatedAt: null,
    password: '12345678',
  };

  const anotherMockedUser: User = {
    email: 'joananinguem@gmail.com',
    firstName: 'Joana',
    lastName: 'Ninguém',
    id: 6,
    createdAt: new Date(),
    updatedAt: null,
    password: '12345678',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockedUserRepository, // Use o mock corretamente
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository) as jest.Mocked<UserRepository>; // Força o tipo como mock
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('Should return all users', async () => {
    userRepository.getAll.mockResolvedValue([mockUser]); // Agora `getAll` funciona como esperado

    const users = await userService.getAll();

    expect(users).toEqual([mockUser]);
    expect(userRepository.getAll).toHaveBeenCalledTimes(1); // Certifique-se de testar o método correto
  });

  it('Should be able to create an User', async () => {
    userRepository.create.mockResolvedValue(mockUser);
    userRepository.getByEmail.mockResolvedValue(null);

    const user = await userService.create(mockUser);

    expect(user).toEqual(mockUser);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });

  it('Should be able to update an User', async () => {
    userRepository.update.mockResolvedValue(anotherMockedUser);

    const user = await userService.update(mockUser.id, anotherMockedUser);

    expect(user).toEqual(anotherMockedUser);
    expect(userRepository.update).toHaveBeenCalledTimes(1);
  });

  it('Should be able to delete an User', async () => {
    userRepository.delete.mockResolvedValue();

    await userService.delete(mockUser.id);

    expect(userRepository.delete).toHaveBeenCalledTimes(1);
  });
});
