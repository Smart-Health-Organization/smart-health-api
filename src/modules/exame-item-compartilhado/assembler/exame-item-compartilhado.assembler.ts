import { ExameItemsMapResponseType } from '@modules/exame/type/exame-items-map.response.type';
import { ExameItemCompartilhado } from './../../../types/entities/exame-item-compartilhado.entity';

const crypto = require('crypto');

export class ExameItemCompartilhadoAssembler {
  public static assembleItemEntityToResponseType(
    entidades: ExameItemCompartilhado[],
  ): ExameItemsMapResponseType {
    const object = {} as ExameItemsMapResponseType;
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
