import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { IsPublic } from 'src/decorators/public.decorator';
import { User } from 'src/decorators/user.decorator';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { EditUserDTO } from 'src/dto/edit-user-dto';
import { RedefinePasswordDTO } from 'src/dto/redefine-password.dto';
import { BaseResponseType } from 'src/interfaces/base-response.type';
import { BaseUserType } from 'src/interfaces/base-user.type';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<Partial<PrismaUser>> {
    return await this.userService.createUser(body);
  }

  @Patch()
  async editUser(
    @Body() body: EditUserDTO,
    @User() user: BaseUserType,
  ): Promise<Partial<PrismaUser>> {
    return await this.userService.editUser(body, user);
  }

  @Post('/redefine-password')
  async redefinePassword(
    @Body() body: RedefinePasswordDTO,
    @User() user: BaseUserType,
  ): Promise<BaseResponseType> {
    return await this.userService.redefinePassword(body, user);
  }

  @Get()
  async getUser(@User() { id }: BaseUserType): Promise<Partial<PrismaUser>> {
    return await this.userService.getUser(id);
  }
}
