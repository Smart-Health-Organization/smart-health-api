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
  })
  dataInicio: string;

  @Field()
  @IsNotEmpty({ message: 'Data de fim é obrigatória' })
  @IsString({ message: 'Data de fim deve ser um texto' })
  @ApiProperty({
    type: Date,
  })
  dataFim: string;
}
