import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAntropometriaInsertDto {
  @Field()
  @IsInt({ message: 'Altura deve ser um número inteiro' })
  @ApiProperty({
    example: 172,
  })
  @IsPositive({ message: 'Altura deve ser um valor positivo' })
  altura: number;

  @Field()
  @IsNumber({}, { message: 'Peso deve ser um número' })
  @ApiProperty({
    example: 79,
  })
  @IsPositive({ message: 'Peso deve ser um valor positivo' })
  peso: number;

  @Field()
  @IsNumber(
    {},
    { message: 'Frequência de atividade Física deve ser um número' },
  )
  @ApiProperty({
    example: 3,
  })
  @Min(0, {
    message: 'Frequência de atividade física deve ser maior ou igual que 0',
  })
  @Max(7, {
    message: 'Frequência de atividade física deve ser menor ou igual a 7',
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
  @IsPositive({ message: 'Medida da coxa deve ser um valor positivo' })
  coxa: number;

  @Field()
  @IsNumber({}, { message: 'Medida do abdominal deve ser um número' })
  @ApiProperty({
    example: 30,
  })
  @IsPositive({ message: 'Medida do abdominal deve ser um valor positivo' })
  abdominal: number;

  @Field()
  @IsNumber({}, { message: 'Medida do triceps deve ser um número' })
  @ApiProperty({
    example: 40,
  })
  @IsPositive({ message: 'Medida do tríceps deve ser um valor positivo' })
  triceps: number;

  @Field()
  @IsNumber({}, { message: 'Medida da suprailíaca deve ser um número' })
  @ApiProperty({
    example: 50,
  })
  @IsPositive({ message: 'Medida da suprailíaca deve ser um valor positivo' })
  suprailiaca: number;
}
