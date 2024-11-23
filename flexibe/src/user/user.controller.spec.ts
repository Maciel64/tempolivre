import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController testing suit', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = (await module).get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return all users', () => {
    expect(controller.index()).toEqual([]);
  });
});
