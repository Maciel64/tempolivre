import { ForbiddenException } from '@nestjs/common';

export class UserAlreadyRegisteredException extends ForbiddenException {
  constructor(message: string = 'The passed User is already registered') {
    super(message);
  }
}
