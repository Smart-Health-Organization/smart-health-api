import { AntropometriaResponseDto } from '@app/types/dtos/response/antropometria.response.dto';
import { Antropometria } from '@app/types/entities/antropometria.entity';

export class AntropometriaAssembler {
  static assembleAntropometriaToResponse(
    antropometria: Antropometria,
  ): AntropometriaResponseDto {
    return {
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
    };
  }

  static assembleAntropometriasToResponse(
    antropometrias: Antropometria[],
  ): AntropometriaResponseDto[] {
    return antropometrias?.map((antropometria) =>
      this.assembleAntropometriaToResponse(antropometria),
    );
  }
}
