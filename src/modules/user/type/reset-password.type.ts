import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class ResetPassword {
  @IsString()
  @ApiProperty({
    example: 'oldPassword',
  })
  oldPassword: string;

  @IsString()
  @ApiProperty({
    example: 'newPassword',
  })
  newPassword: string;
}
