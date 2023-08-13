import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.insert.dto';
import { ItemsDoExameResponseType } from '@modules/exame/type/exame-and-exame-items.response.type';
import { ApiProperty } from '@nestjs/swagger';

export class ExameCompartilhadoResponse {
  @ApiProperty({ example: 'Título' })
  titulo: string;

  @ApiProperty({ example: 'login' })
  login: string;

  @ApiProperty({ type: ItemsDoExameResponseType })
  itens: ExameItemsMapResponseData;
}
