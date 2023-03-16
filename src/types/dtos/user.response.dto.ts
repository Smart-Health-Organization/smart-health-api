import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UserResponseDto {

  name: string;

  age: number;

  email: string;

  login: string;

}
