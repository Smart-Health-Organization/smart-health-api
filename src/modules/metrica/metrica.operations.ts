import { Metrica } from '@app/types/entities/metrica.entity';

export interface MetricaOperations {
  getMetricas(): Promise<any>;
  getMetricaByName(nome: string): Promise<Metrica>;
}
