import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @ApiProperty({
    example: 'Thiago Sanches',
  })
  name: string;

  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Age should not be empty' })
  @ApiProperty({
    example: 22,
  })
  age: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Login should not be empty' })
  @ApiProperty({
    example: 'thisanches07',
  })
  login: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
