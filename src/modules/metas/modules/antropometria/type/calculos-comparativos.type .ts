import { Expose } from 'class-transformer';

export class CalculosComparativos {
  @Expose()
  data: string;

  @Expose()
  densidadeCorporal: number;

  @Expose()
  gorduraCorporal: number;

  @Expose()
  massaMagra: number;

  @Expose()
  caloriasDiarias: number;

  @Expose()
  taxaMetabolicaBasal: number;

  @Expose()
  peso: number;
}
