import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.insert.dto';
import { UsuarioResponseDto } from '@app/types/dtos/response/usuario.response.dto';
import { MetaCompartilhadaResponseType } from '@modules/meta-compartilhada/type/meta-compartilhada.response.type';
import { ApiProperty } from '@nestjs/swagger';

export class ExameEItensCompartilhadoResponse {
  @ApiProperty({
    example: 'Apenas um título',
  })
  titulo: string;

  @ApiProperty({
    type: UsuarioResponseDto,
  })
  usuario: UsuarioResponseDto;

  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          data: { type: 'string', format: 'date-time' },
          medida: { type: 'number' },
          unidade: { type: 'string' },
          isAtual: { type: 'boolean' },
          isAlterado: { type: 'boolean' },
        },
      },
    },
  })
  itens: ExameItemsMapResponseData;

  @ApiProperty({ type: MetaCompartilhadaResponseType })
  meta: MetaCompartilhadaResponseType;
}
