import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Thiago Sanches',
  })
  name: string;

  @ApiProperty({
    example: 22,
  })
  age: number;

  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'thisanches07',
  })
  login: string;
}
