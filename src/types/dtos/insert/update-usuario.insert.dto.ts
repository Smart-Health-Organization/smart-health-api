import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUsuarioInsertDto {
  @Field()
  @IsString()
  @IsOptional()
  nome?: string;

  @Field()
  @IsNumber()
  @IsOptional()
  idade?: number;

  @Field()
  @IsString()
  @IsOptional()
  email?: string;
}
