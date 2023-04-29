import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUsuarioInsertDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty({
    example: 'Thiago Sanches',
  })
  nome: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Idade é obrigatória' })
  @ApiProperty({
    example: 22,
  })
  idade: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Sexo é obrigatório' })
  @ApiProperty({
    example: 'masculino',
  })
  sexo: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email é obrigatória' })
  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @ApiProperty({
    example: 'uma senha qualquer',
  })
  senha: string;
}
