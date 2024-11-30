import { Module } from '@nestjs/common';
import { UserRepository } from 'src/interfaces/repositories/user.repository';
import { PrismaUserRepository } from 'src/infra/database/prisma/repositories/prisma-user.repository';
import { UserController } from '../controllers/user.controller';
import { PrismaModule } from './prisma.module';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    { provide: UserRepository, useClass: PrismaUserRepository },
    UserService,
  ],
})
export class UserModule {}
