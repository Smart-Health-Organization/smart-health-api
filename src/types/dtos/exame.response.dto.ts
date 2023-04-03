import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IdAndNameResponseType } from 'src/types/id-and-name.response';
import { UserResponseDto } from './user.response.dto';

@InputType()
export class ExameResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Thu Mar 30 2023 17:19:08 GMT-0300 (Brasilia Standard Time)',
  })
  data: string;

  itens?: string;

  @ApiProperty({
    type: UserResponseDto,
  })
  user: IdAndNameResponseType;
}
