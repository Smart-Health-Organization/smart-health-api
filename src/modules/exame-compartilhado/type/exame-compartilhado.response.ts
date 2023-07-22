import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.insert.dto';

export class ExameCompartilhadoResponse {
  titulo: string;
  login: string;
  itens: ExameItemsMapResponseData;
}
