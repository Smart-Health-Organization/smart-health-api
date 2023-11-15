import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

@InputType()
export class CreateMetaInsertDto {
  @Field()
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @IsString({ message: 'Título deve ser um texto' })
  @ApiProperty({
    example: 'Thiago Sanches',
  })
  titulo: string;

  @Field()
  @IsNotEmpty({ message: 'Data de início é obrigatória' })
  @IsString({ message: 'Data de início deve ser um texto' })
  @ApiProperty({
    type: Date,
    example: '2001-03-07T00:00:00.000Z',
  })
  @IsISO8601(
    { strict: true },
    { message: 'Data de início deve ser uma data válida' },
  )
  dataInicio: string;

  @Field()
  @IsNotEmpty({ message: 'Data de fim é obrigatória' })
  @IsString({ message: 'Data de fim deve ser um texto' })
  @ApiProperty({
    type: Date,
    example: '2001-03-07T00:00:00.000Z',
  })
  @IsISO8601(
    { strict: true },
    { message: 'Data de fim deve ser uma data válida' },
  )
  dataFim: string;

  @IsNotEmpty({ message: 'Massa magra é obrigatória' })
  @ApiProperty({
    example: 15,
  })
  @IsPositive({ message: 'Massa magra deve ser um valor positivo' })
  @IsNumber({}, { message: 'Massa magra deve ser enviada como um número' })
  massaMagra: number;

  @Field()
  @IsNotEmpty({ message: 'Gordura Corporal é obrigatória' })
  @ApiProperty({
    example: 20,
  })
  @IsPositive({ message: 'Gordura corporal deve ser um valor positivo' })
  @IsNumber({}, { message: 'Gordura corporal deve ser enviada como um número' })
  gorduraCorporal: number;
}
