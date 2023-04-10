import { Limite } from '@app/types/entities/limite.entity';
import { Metrica } from '@app/types/entities/metrica.entity';
import { ResultadoExameItem } from '@app/types/entities/resultado-exame.entity';
import { MetricaService } from '@modules/metrica/metrica.service';
import { LimiteService } from '@modules/metrica/modules/limite/limite.service';
import { ExameItem } from 'src/types/entities/exame-item.entity';
import { Repository } from 'typeorm';
import { ExameItemService } from '../../src/modules/exame-item/exame-item.service';
import { ExameService } from '../../src/modules/exame/exame.service';
import { Exame } from '../../src/types/entities/exame.entity';
var examesMock = require('./mock/examesMock.json');
var exameItemsMock = require('./mock/exameItemsMock.json');
var exameItemsFromAllExamesResponse = require('./mock/exameItemsFromAllExamesResponse.mock.json');

describe('UserService', () => {
  let exameService: ExameService;
  let exameItemService: ExameItemService;
  let metricaService: MetricaService;
  let limiteService: LimiteService;
  let exameMockRepository: Partial<Repository<Exame>>;
  let exameItemMockRepository: Partial<Repository<ExameItem>>;
  let resultadoMockRepository: Partial<Repository<ResultadoExameItem>>;
  let metricaMockRepository: Partial<Repository<Metrica>>;
  let limiteMockRepository: Partial<Repository<Limite>>;

  //criando beforeEach para ser rodado antes de cada teste
  beforeEach(() => {
    //mockando retornos do método create do repositório
    exameMockRepository = {
      find: jest.fn().mockReturnValue(examesMock),
    };
    exameItemMockRepository = {
      find: jest.fn().mockReturnValue(exameItemsMock),
    };
    resultadoMockRepository = {
      find: jest.fn().mockReturnValue(0),
    };
    metricaMockRepository = {
      find: jest.fn().mockReturnValue(0),
    };
    metricaService = new MetricaService(
      metricaMockRepository as Repository<Metrica>,
    );
    limiteService = new LimiteService(
      limiteMockRepository as Repository<Limite>,
    );
    //instanciando o serviço
    exameItemService = new ExameItemService(
      exameItemMockRepository as Repository<ExameItem>,
      resultadoMockRepository as Repository<ResultadoExameItem>,
      metricaService,
      limiteService,
    );
    exameService = new ExameService(
      exameMockRepository as Repository<Exame>,
      exameItemService,
    );
  });

  describe('getExames', () => {
    //teste para verificar se o método está retornando as mesmas informações
    //do usuário que deve ser criado
    it('should return all exames and exameItems for that user', async () => {
      // Chama a função createUser do UserService e armazena o valor retornado
      const exames = await exameService.getExamesByUserId('1');
      // Verifica se a função retornou corretamente o novo usuário criado
      expect(exames).toEqual(examesMock);
    });
  });
  describe('getExameItemsFromAllExams', () => {
    //teste para verificar se o método está retornando as mesmas informações
    //do usuário que deve ser criado
    it('should return all exameItems from all exams for that user', async () => {
      // Chama a função createUser do UserService e armazena o valor retornado
      const exameItens = await exameService.getExameItemsFromAllExamsByUser(
        '1',
      );
      // Verifica se a função retornou corretamente o novo usuário criado
      expect(exameItens).toEqual(exameItemsFromAllExamesResponse);
    });
  });
});
