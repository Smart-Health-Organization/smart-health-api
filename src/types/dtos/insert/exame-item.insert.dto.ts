import { IsDateFormat } from '@app/utils/date-format';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateExameItemInsertDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Métrica é obrigatória' })
  @ApiProperty({
    example: 'colesterol',
  })
  metrica: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'medida' })
  @ApiProperty({
    example: '100',
  })
  medida: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'unidade' })
  @ApiProperty({
    example: 'mg/L',
  })
  unidade: string;
}

export class CreateExameItemInsertDtoArray extends Array<CreateExameItemInsertDto> {}

export class CreateExameItems {
  @IsDateFormat()
  @IsNotEmpty({ message: 'Data é obrigatória' })
  @ApiProperty({
    type: Date,
    example: '2023-08-23T00:00:00.000Z',
  })
  data: string;

  @Type(() => CreateExameItemInsertDto)
  @ValidateNested()
  @IsNotEmpty({ message: 'Itens são obrigatórios' })
  @ApiProperty({
    type: [CreateExameItemInsertDto],
  })
  itens: CreateExameItemInsertDtoArray;
}
