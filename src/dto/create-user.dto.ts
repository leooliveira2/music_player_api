import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @Length(1, 100, { message: 'O nome precisa ter entre 1 e 100 caracteres' })
  @ApiProperty({ name: 'name' })
  name: string;

  @IsOptional()
  @Length(1, 100, {
    message: 'O sobrenome precisa ter entre 1 e 100 caracteres',
  })
  @ApiPropertyOptional({ name: 'lastName' })
  lastName: string;

  @IsNotEmpty({ message: 'O e-mail não pode ser vazio!' })
  @Length(1, 255, { message: 'O e-mail precisa ter entre 1 e 255 caracteres' })
  @IsEmail({}, { message: 'Informe um e-mail válido!' })
  @ApiProperty({ name: 'email' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia!' })
  @Length(8, 32, { message: 'A senha precisa ter entre 8 e 32 caracteres' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'A senha precisa ter no mínimo 8 caracteres, sendo eles no mínimo: 1 maiúsculo, 1 minúsculo, 1 símbolo e 1 número',
    },
  )
  @ApiProperty({ name: 'password' })
  password: string;
}

/* 
@Type(() => Boolean)
active: boolean; 
*/
