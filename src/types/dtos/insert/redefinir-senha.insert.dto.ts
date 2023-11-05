import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class RedefinirSenhaInsertDto {
  @IsString({ message: 'Senha antiga deve ser um texto' })
  @ApiProperty({
    example: 'senhaAntiga',
  })
  senhaAntiga: string;

  @IsString({ message: 'Senha nova deve ser um texto' })
  @ApiProperty({
    example: 'NovaSenha',
  })
  novaSenha: string;
}
