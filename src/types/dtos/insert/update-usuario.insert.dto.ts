import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUsuarioInsertDto {
  @Field()
  @IsString({ message: 'Nome deve ser um texto' })
  @IsOptional()
  nome?: string;

  @Field()
  @IsNumber()
  @IsOptional()
  idade?: number;

  @Field()
  @IsString({ message: 'Email deve ser um texto' })
  @IsOptional()
  email?: string;
}
