import { UsuarioResponseDto } from '@app/types/dtos/response/user.response.dto';
import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
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
    type: ExameItemsMapResponseType,
  })
  itens: ExameItemsMapResponseType;
}
