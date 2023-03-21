import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
@InputType()
export class AuthInput {
  @IsString()
  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;
  @IsString()
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
