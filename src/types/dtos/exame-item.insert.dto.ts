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
export class ExameItemInsertDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'metrica should not be empty' })
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

export class InsertExameItems {
  @Type(() => ExameItemInsertDto)
  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty({
    type: [ExameItemInsertDto],
  })
  itens: ExameItemInsertDto[];
}
