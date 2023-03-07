import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Age should not be empty' })
  age: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Login should not be empty' })
  login: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
