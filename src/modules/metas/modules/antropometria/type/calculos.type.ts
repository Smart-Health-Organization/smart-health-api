import { Antropometria } from '@app/types/entities/antropometria.entity';

export type Calculos = Pick<
  Antropometria,
  | 'densidadeCorporal'
  | 'gorduraCorporal'
  | 'massaMagra'
  | 'caloriasDiarias'
  | 'taxaMetabolicaBasal'
>;
