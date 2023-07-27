import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';

export interface ExameItemCompartilhadoOperations {
  criarExameItemCompartilhado(
    exameCompartilhado: ExameCompartilhado,
    exameItemComartilhadoRequest: ExameItemsMapResponseData,
  );

  getExameItensCompartilhadosByExameId(
    exameId: number,
  ): Promise<ExameItemsMapResponseType>;
}
