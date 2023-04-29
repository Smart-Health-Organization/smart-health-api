import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class RedefinirSenhaInsertDto {
  @IsString()
  @ApiProperty({
    example: 'senhaAntiga',
  })
  senhaAntiga: string;

  @IsString()
  @ApiProperty({
    example: 'NovaSenha',
  })
  NovaSenha: string;
}
