import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { EditUserDTO } from 'src/dto/edit-user-dto';
import { RedefinePasswordDTO } from 'src/dto/redefine-password.dto';
import { BaseResponseType } from 'src/interfaces/base-response.type';
import { BaseUserType } from 'src/interfaces/base-user.type';
import { UserRepository } from 'src/interfaces/repositories/user.repository';
import { HashUtil } from 'src/utils/hash.util';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({
    email,
    name,
    lastName,
    password,
  }: CreateUserDTO): Promise<Partial<User>> {
    return await this.userRepository.create({
      email,
      name,
      lastName,
      password: HashUtil.make(password),
    });
  }

  async editUser(
    data: EditUserDTO,
    user: BaseUserType,
  ): Promise<Partial<User>> {
    return await this.userRepository.edit(data, user);
  }

  async redefinePassword(
    { oldPassword, newPassword }: RedefinePasswordDTO,
    { email }: BaseUserType,
  ): Promise<BaseResponseType> {
    const user = await this.userRepository.findByEmail(email);

    if (!HashUtil.validate(oldPassword, user.password)) {
      throw new ForbiddenException({ message: 'Senha atual é inválida!' });
    }

    await this.userRepository.redefinePassword(
      user.id,
      HashUtil.make(newPassword),
    );

    return {
      status: 'success',
      message: 'Senha redefinida com sucesso!',
    };
  }

  async getUser(userId: string): Promise<Partial<User>> {
    return await this.userRepository.findById(userId);
  }
}
