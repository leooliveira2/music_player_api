import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { EditUserDTO } from 'src/dto/edit-user-dto';
import { BaseUserType } from '../base-user.type';

export abstract class UserRepository {
  abstract create(user: CreateUserDTO): Promise<Partial<User>>;
  abstract findByEmail(email: string): Promise<User>;
  abstract edit(
    newInfos: EditUserDTO,
    user: BaseUserType,
  ): Promise<Partial<User>>;
  abstract redefinePassword(userId: string, newPassword: string): Promise<void>;
  abstract findById(id: string): Promise<Partial<User>>;
}
