import { AntropometriaComparativoResponseData } from '@modules/metas/modules/antropometria/type/antropometria-comparativo.response.type';
import { ApiProperty } from '@nestjs/swagger';

export class MetaCompartilhadaResponseType {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 20 })
  gorduraCorporal: number;

  @ApiProperty({ example: 30 })
  massaMagra: number;

  @ApiProperty({ type: AntropometriaComparativoResponseData })
  comparativos: AntropometriaComparativoResponseData;
}
