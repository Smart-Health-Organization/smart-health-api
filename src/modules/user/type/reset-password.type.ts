import { InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ResetPassword {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
