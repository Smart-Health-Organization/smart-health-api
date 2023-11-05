import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.request.dto';

export interface ExameItemCompartilhadoOperations {
  getExameItensCompartilhadosByExameId(
    exameId: number,
  ): Promise<ExameItemsMapResponseData>;
}
