import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAntropometriaInsertDto {
  @Field()
  @IsNumber({}, { message: 'Altura deve ser um número' })
  @ApiProperty({
    example: 172,
  })
  altura: number;

  @Field()
  @IsNumber({}, { message: 'Peso deve ser um número' })
  @ApiProperty({
    example: 79,
  })
  peso: number;

  @Field()
  @IsNumber(
    {},
    { message: 'Frequência de atividade Física deve ser um número' },
  )
  @ApiProperty({
    example: 3,
  })
  atividadeFisicaSemanal: number;

  @Field()
  @IsString({ message: 'Data deve ser um texto' })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @ApiProperty({
    type: Date,
    example: '2001-03-07T00:00:00.000Z',
  })
  data: string;

  @Field()
  @IsNumber({}, { message: 'Medida da coxa deve ser um número' })
  @ApiProperty({
    example: 20,
  })
  coxa: number;

  @Field()
  @IsNumber({}, { message: 'Medida do abdominal deve ser um número' })
  @ApiProperty({
    example: 30,
  })
  abdominal: number;

  @Field()
  @IsNumber({}, { message: 'Medida do triceps deve ser um número' })
  @ApiProperty({
    example: 40,
  })
  triceps: number;

  @Field()
  @IsNumber({}, { message: 'Medida da suprailíaca deve ser um número' })
  @ApiProperty({
    example: 50,
  })
  suprailiaca: number;
}
