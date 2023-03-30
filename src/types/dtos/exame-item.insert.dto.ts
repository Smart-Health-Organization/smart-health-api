import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

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
  medida: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'unidade' })
  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  unidade: string;

  
}

export class insertExameItems{
  @Type(()=> ExameItemInsertDto)
  @ValidateNested()
  @IsNotEmpty()
  itens: ExameItemInsertDto[]
}
