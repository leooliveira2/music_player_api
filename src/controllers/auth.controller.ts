import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { IsPublic } from 'src/decorators/public.decorator';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() body: LoginDTO): Promise<Partial<User>> {
    return await this.authService.login(body);
  }
}
