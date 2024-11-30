import { PrismaService } from 'src/infra/database/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/interfaces/repositories/user.repository';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { PrismaErrorCode } from '../errors';
import { UserEmailExistsException } from 'src/exceptions/user/user-email-exists.exception';
import { UserNotFoundException } from 'src/exceptions/user/user-not-found.exception';
import { EditUserDTO } from 'src/dto/edit-user-dto';
import { BaseUserType } from 'src/interfaces/base-user.type';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDTO): Promise<Partial<User>> {
    try {
      return await this.prisma.user.create({
        data: user,
        select: {
          id: true,
          email: true,
          name: true,
          lastName: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error.code === PrismaErrorCode.ConstraintViolation) {
        throw new UserEmailExistsException();
      }

      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      if (error.code === PrismaErrorCode.RecordNotFound) {
        throw new UserNotFoundException();
      }

      throw error;
    }
  }

  async edit(
    newInfos: EditUserDTO,
    { id }: BaseUserType,
  ): Promise<Partial<User>> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: newInfos.name,
        lastName: newInfos.lastName,
      },
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async redefinePassword(userId: string, newPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: newPassword,
      },
    });
  }

  async findById(id: string): Promise<Partial<User>> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      if (error.code === PrismaErrorCode.RecordNotFound) {
        throw new UserNotFoundException();
      }

      throw error;
    }
  }
}
