import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';

export interface ExameItemCompartilhadoOperations {
  criarExameItemCompartilhado(
    exameCompartilhado: ExameCompartilhado,
    exameItemComartilhadoRequest: ExameItemsMapResponseData,
  );

  getExameItensCompartilhadosByExameId(
    exameId: number,
  ): Promise<ExameItemsMapResponseData>;
}
