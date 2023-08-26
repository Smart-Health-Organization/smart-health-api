import { IdENomeResponseType } from '@app/types/dtos/response/id-e-nome.response';
import { ExameItem } from '@app/types/entities/exame-item.entity';
import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { UsuarioResponseDto } from './usuario.response.dto';

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

  itens: ExameItem[];

  @ApiProperty({
    type: UsuarioResponseDto,
  })
  usuario: IdENomeResponseType;
}
