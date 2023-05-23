import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UsuarioResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Thiago Sanches',
  })
  nome: string;

  @ApiProperty({
    example: 22,
  })
  idade: number;

  @ApiProperty({
    example: 'masculino',
  })
  sexo: string;

  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;
}
