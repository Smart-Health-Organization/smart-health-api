import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUsuarioInsertDto {
  @Field()
  @IsString({ message: 'Nome deve ser um texto' })
  @IsOptional()
  nome?: string;

  @Field()
  @IsString({ message: 'Data deve ser um texto' })
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
  @IsString({ message: 'Email deve ser um texto' })
  @IsOptional()
  email?: string;
}
