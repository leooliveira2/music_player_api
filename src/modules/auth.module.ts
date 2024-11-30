import { Module } from '@nestjs/common';
import { UserRepository } from 'src/interfaces/repositories/user.repository';
import { PrismaUserRepository } from 'src/infra/database/prisma/repositories/prisma-user.repository';
import { PrismaModule } from './prisma.module';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    { provide: UserRepository, useClass: PrismaUserRepository },
    AuthService,
  ],
})
export class AuthModule {}
