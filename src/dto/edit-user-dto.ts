import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class EditUserDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @Length(1, 100, { message: 'O nome precisa ter entre 1 e 100 caracteres' })
  @ApiPropertyOptional({ name: 'name' })
  name: string;

  @IsOptional()
  @Length(1, 100, {
    message: 'O sobrenome precisa ter entre 1 e 100 caracteres',
  })
  @ApiPropertyOptional({ name: 'lastName' })
  lastName: string;
}
