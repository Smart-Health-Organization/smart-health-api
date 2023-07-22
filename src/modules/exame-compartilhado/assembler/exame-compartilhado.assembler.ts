import {
  ExameCompartilhadoInsertDto,
  ExameItemsMapResponseData,
} from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { ExameItemCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-item-compartilhado.insert.dto';

const crypto = require('crypto');

export class ExameCompartilhadoAssembler {
  public static assembleExameCompartilhadorequestToEntity(
    exameComartilhadoRequest: ExameCompartilhadoInsertDto,
  ) {
    const { titulo, senha } = exameComartilhadoRequest;
    const itensFormatados = this.assembleExameItemCompartilhadoInsertToEntity(
      exameComartilhadoRequest.itens,
    );
    return {
      titulo,
      login: crypto.randomUUID(),
      senha,
    };
  }

  public static assembleExameItemCompartilhadoInsertToEntity(
    exameItens: ExameItemsMapResponseData,
  ): ExameItemCompartilhadoInsertDto[] {
    const itensFormatados: ExameItemCompartilhadoInsertDto[] = [];
    for (let key of Object.keys(exameItens)) {
      const metrica = exameItens[key];

      metrica.forEach((item) => {
        itensFormatados.push({
          nome: key,
          data: new Date(item.data),
          medida: item.medida,
          unidade: item.unidade,
          isAtual: item.isAtual,
          isAlterado: item.isAlterado,
        });
      });
    }
    return itensFormatados;
  }
}
