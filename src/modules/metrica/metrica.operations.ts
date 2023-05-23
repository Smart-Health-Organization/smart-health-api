import { Metrica } from '@app/types/entities/metrica.entity';

export interface MetricaOperations {
  getMetricas(): Promise<Metrica[]>;
  getMetricaByName(nome: string): Promise<Metrica>;
}
