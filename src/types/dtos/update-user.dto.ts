import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsOptional()
  name?: string;

  @Field()
  @IsNumber()
  @IsOptional()
  age?: number;

  @Field()
  @IsString()
  @IsOptional()
  email?: string;

  @Field()
  @IsString()
  @IsOptional()
  login?: string;

  @Field()
  @IsString()
  @IsOptional()
  password?: string;
}
