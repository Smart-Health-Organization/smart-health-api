import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/types/dtos/user.response.dto';
import { User } from 'src/types/entities/user.entity';

@ObjectType()
export class AuthType {
  @ApiProperty({
    type: UserResponseDto,
  })
  @Field(() => User)
  user: User;

  @Field()
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
