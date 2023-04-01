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
  let exameMockRepository: Partial<Repository<Exame>>;
  let exameItemMockRepository: Partial<Repository<ExameItem>>;

  //criando beforeEach para ser rodado antes de cada teste
  beforeEach(() => {
    //mockando retornos do método create do repositório
    exameMockRepository = {
      find: jest.fn().mockReturnValue(examesMock),
    };
    exameItemMockRepository = {
      find: jest.fn().mockReturnValue(exameItemsMock),
    };
    //instanciando o serviço
    exameItemService = new ExameItemService(
      exameItemMockRepository as Repository<ExameItem>,
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
