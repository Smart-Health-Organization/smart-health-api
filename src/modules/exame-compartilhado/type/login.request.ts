import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
@InputType()
export class LoginRequest {
  @IsString()
  @ApiProperty({
    example: 'login',
  })
  login: string;
  @IsString()
  @ApiProperty({
    example: 'apenas uma senha',
  })
  senha: string;
}
