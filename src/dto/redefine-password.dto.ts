import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class RedefinePasswordDTO {
  @IsNotEmpty({ message: 'A senha não pode ser vazia!' })
  @ApiProperty({ name: 'oldPassword' })
  oldPassword: string;

  @IsNotEmpty({ message: 'A nova senha não pode ser vazia!' })
  @Length(8, 32, { message: 'A nova senha precisa ter entre 8 e 32 caracteres' })
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
        'A senha nova precisa ter no mínimo 8 caracteres, sendo eles no mínimo: 1 maiúsculo, 1 minúsculo, 1 símbolo e 1 número',
    },
  )
  @ApiProperty({ name: 'newPassword' })
  newPassword: string;
}
