import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

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
  @IsString({ message: 'Data deve ser um texto' })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @ApiProperty({
    type: Date,
    example: '2001-03-07T00:00:00.000Z',
  })
  @IsISO8601(
    { strict: true },
    { message: 'Data de nascimento deve ser uma data válida' },
  )
  dataDeNascimento: string;

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
  @IsEmail({}, { message: 'Email com formato incorreto' })
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
