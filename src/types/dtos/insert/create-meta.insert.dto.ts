import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  dataInicio: string;

  @Field()
  @IsNotEmpty({ message: 'Data de fim é obrigatória' })
  @IsString({ message: 'Data de fim deve ser um texto' })
  @ApiProperty({
    type: Date,
    example: '2001-03-07T00:00:00.000Z',
  })
  dataFim: string;

  @IsNotEmpty({ message: 'Massa magra é obrigatória' })
  @ApiProperty({
    example: 15,
  })
  massaMagra: number;

  @Field()
  @IsNotEmpty({ message: 'Gordura Corporal é obrigatória' })
  @ApiProperty({
    example: 20,
  })
  gorduraCorporal: number;
}
