export type Comparativo = {
  data: string;
  medida: number;
};

export class AntropometriaComparativoResponseData {
  densidadeCorporal: Comparativo[];

  gorduraCorporal: Comparativo[];

  massaMagra: Comparativo[];

  caloriasDiarias: Comparativo[];

  taxaMetabolicaBasal: Comparativo[];
}
