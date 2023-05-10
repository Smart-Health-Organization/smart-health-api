import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateUsuarioInsertDto {
  @Field()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser um texto' })
  @ApiProperty({
    example: 'Thiago Sanches',
  })
  nome: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Idade é obrigatória' })
  @Min(0, { message: 'Idade deve ser maior que 0' })
  @ApiProperty({
    example: 22,
  })
  idade: number;

  @Field()
  @IsNotEmpty({ message: 'Sexo deve ser um texto' })
  @IsString({ message: 'Sexo é obrigatório' })
  @ApiProperty({
    example: 'masculino',
  })
  sexo: string;

  @Field()
  @IsString({ message: 'Email deve ser um texto' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail()
  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;

  @Field()
  @IsString({ message: 'Senha é obrigatória' })
  @IsNotEmpty({ message: 'Senha deve ser um texto' })
  @ApiProperty({
    example: 'uma senha qualquer',
  })
  senha: string;
}
