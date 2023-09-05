import { Metrica } from '@app/types/entities/metrica.entity';
import { MetricaService } from '@modules/metrica/metrica.service';
import { Repository } from 'typeorm/repository/Repository';
var findMetricasMock = require('./mock/findMetricasMock.json');
var findOneMetricaMock = require('./mock/findOneMetricaMock.json');
let metricaService: MetricaService;
let metricaRepositoryMock: Partial<Repository<Metrica>>;

describe('MetricaService', () => {
  beforeEach(async () => {
    metricaRepositoryMock = {
      findOne: jest.fn().mockReturnValue(findOneMetricaMock),
      find: jest.fn().mockReturnValue(findMetricasMock),
    };

    metricaService = new MetricaService(
      metricaRepositoryMock as Repository<Metrica>,
    );
  });

  describe('getMetricas', () => {
    it('Deve recuperar todas as métricas', async () => {
      const metricas = await metricaService.getMetricas();
      expect(metricas).toBe(findMetricasMock);
    });
    it('Deve recuperar uma métrica por nome', async () => {
      const metrica = await metricaService.getMetricaByName('HDL');
      expect(metrica).toBe(findOneMetricaMock);
    });
  });

  it('Deve recuperar uma métrica por nome', async () => {
    const metrica = await metricaService.getMetricaByName('LDL');
    expect(metrica).toBe(findOneMetricaMock);
  });
});
