import { InputType } from '@nestjs/graphql';

@InputType()
export class UserResponseDto {
  id: number;

  name: string;

  age: number;

  email: string;

  login: string;
}
