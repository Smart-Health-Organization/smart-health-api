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
    type: Date,
    example: '2001-03-07T00:00:00.000Z',
  })
  dataDeNascimento: string;

  @ApiProperty({
    example: 'masculino',
  })
  sexo: string;

  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;
}
