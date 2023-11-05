import { ApiProperty } from '@nestjs/swagger';

export class Comparativo {
  @ApiProperty({ example: new Date() })
  data: Date;

  @ApiProperty({ example: 10 })
  medida: number;
}

export class AntropometriaComparativoResponseData {
  @ApiProperty({ type: Comparativo })
  densidadeCorporal: Comparativo[];

  @ApiProperty({ type: Comparativo })
  gorduraCorporal: Comparativo[];

  @ApiProperty({ type: Comparativo })
  massaMagra: Comparativo[];

  @ApiProperty({ type: Comparativo })
  caloriasDiarias: Comparativo[];

  @ApiProperty({ type: Comparativo })
  taxaMetabolicaBasal: Comparativo[];

  @ApiProperty({ type: Comparativo })
  peso: Comparativo[];
}
