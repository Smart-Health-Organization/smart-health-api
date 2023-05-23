export interface LimiteOperations {
  getLimitesByMetricaId(metricaId: string): Promise<any>;
}
