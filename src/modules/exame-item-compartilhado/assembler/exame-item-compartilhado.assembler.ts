import { ExameItemsMapResponseData } from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { ExameItemCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-item-compartilhado.insert.dto';
import { ExameItemCompartilhado } from './../../../types/entities/exame-item-compartilhado.entity';

const crypto = require('crypto');

export class ExameItemCompartilhadoAssembler {
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

  public static assembleItemCreationToResponseType(
    entidades: ExameItemCompartilhado[],
  ) {
    const object = {};
    entidades.forEach((item) => {
      const { data, medida, unidade, isAtual, isAlterado } = item;
      if (!object[item.nome]) {
        object[item.nome] = [{ data, medida, unidade, isAtual, isAlterado }];
      } else {
        object[item.nome] = [
          ...object[item.nome],
          { data, medida, unidade, isAtual, isAlterado },
        ];
      }
    });
    return object;
  }
}
