import { AntropometriaResponseDto } from '@app/types/dtos/response/antropometria.response.dto';
import { Antropometria } from '@app/types/entities/antropometria.entity';
import {
  AntropometriaComparativoResponseData,
  Comparativo,
} from '@modules/metas/modules/antropometria/type/antropometria-comparativo.response.type';
import { CalculosComparativos } from '@modules/metas/modules/antropometria/type/calculos-comparativos.type ';
import { plainToClass } from 'class-transformer';

export class AntropometriaAssembler {
  static assembleAntropometriaToResponse(
    antropometria: Antropometria,
  ): AntropometriaResponseDto {
    return {
      id: antropometria?.id,
      altura: antropometria?.altura,
      peso: antropometria?.peso,
      atividadeFisicaSemanal: antropometria?.atividadeFisicaSemanal,
      data: antropometria?.data,
      coxa: antropometria?.coxa,
      abdominal: antropometria?.abdominal,
      triceps: antropometria?.triceps,
      suprailiaca: antropometria?.suprailiaca,
      densidadeCorporal: antropometria?.densidadeCorporal,
      gorduraCorporal: antropometria?.gorduraCorporal,
      massaMagra: antropometria?.massaMagra,
      caloriasDiarias: antropometria?.caloriasDiarias,
      taxaMetabolicaBasal: antropometria?.taxaMetabolicaBasal,
    };
  }

  static assembleAntropometriasToResponse(
    antropometrias: Antropometria[],
  ): AntropometriaResponseDto[] {
    return antropometrias?.map((antropometria) =>
      this.assembleAntropometriaToResponse(antropometria),
    );
  }

  static assembleComparativos(
    antropometrias: AntropometriaResponseDto[],
  ): AntropometriaComparativoResponseData {
    antropometrias = antropometrias.sort((a, b) => {
      const dataA = new Date(a.data);
      const dataB = new Date(b.data);
      return dataB.getTime() - dataA.getTime();
    });
    const comparativos: AntropometriaComparativoResponseData = {
      densidadeCorporal: [],
      gorduraCorporal: [],
      massaMagra: [],
      caloriasDiarias: [],
      taxaMetabolicaBasal: [],
      peso: [],
    };
    const valoresParaComparativos = antropometrias.map((antropometria) =>
      plainToClass(CalculosComparativos, antropometria, {
        excludeExtraneousValues: true,
      }),
    );
    valoresParaComparativos.forEach((antropometria) => {
      Object.keys(antropometria).forEach((key) => {
        if (comparativos[key]) {
          const medida: Comparativo = {
            data: new Date(antropometria.data),
            medida: antropometria[key],
          };
          comparativos[key] = [...comparativos[key], medida];
        }
      });
    });
    return comparativos;
  }
}
