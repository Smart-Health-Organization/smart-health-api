import { ComparativoCompartilhado } from '@app/types/entities/comparativo-compartilhado.entity';
import { AntropometriaComparativoResponseData } from '@modules/metas/modules/antropometria/type/antropometria-comparativo.response.type';

export class ComparativoCompartilhadoAssembler {
  public static assembleComparativoCompartilhadoEntityToResponseType(
    entidades: ComparativoCompartilhado[],
  ): AntropometriaComparativoResponseData {
    const comparativos = {
      densidadeCorporal: [],
      gorduraCorporal: [],
      massaMagra: [],
      caloriasDiarias: [],
      taxaMetabolicaBasal: [],
      peso: [],
    };

    entidades.forEach((item) => {
      const { data, medida, nome } = item;
      if (!comparativos[nome]) {
        comparativos[nome] = [{ data, medida }];
      } else {
        comparativos[nome] = [...comparativos[nome], { data, medida }];
      }
    });
    Object.keys(comparativos).forEach((item) => {
      comparativos[item] = comparativos[item].sort((a, b) => {
        if (a.data < b.data) {
          return 1;
        } else if (a.data > b.data) {
          return -1;
        }
        return 0;
      });
    });
    return comparativos;
  }
}
