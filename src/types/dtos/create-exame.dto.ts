import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/types/entities/user.entity';

@InputType()
export class CreateExameDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Data should not be empty' })
  data: string;

  user: User;
}
