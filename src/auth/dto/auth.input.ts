import { InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
@InputType()
export class AuthInput {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
