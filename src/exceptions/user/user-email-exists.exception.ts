import { ConflictException } from '@nestjs/common';

export class UserEmailExistsException extends ConflictException {
  constructor() {
    super(
      'O e-mail informado já esta cadastrado!',
      UserEmailExistsException.name,
    );
  }
}
