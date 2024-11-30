import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio!' })
  @ApiProperty({ name: 'email' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia!' })
  @ApiProperty({ name: 'password' })
  password: string;
}
