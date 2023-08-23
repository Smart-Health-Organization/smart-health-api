import { IdENomeResponseType } from '@app/types/dtos/response/id-e-nome.response';
import { ExameItem } from '@app/types/entities/exame-item.entity';
import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { UsuarioResponseDto } from './user.response.dto';

@InputType()
export class ExameResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Date,
    example: '2023-08-23T00:00:00.000Z',
  })
  data: string;

  itens: ExameItem[];

  @ApiProperty({
    type: UsuarioResponseDto,
  })
  user: IdENomeResponseType;
}
