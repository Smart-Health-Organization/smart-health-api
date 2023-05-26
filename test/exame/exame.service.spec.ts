import { ExameItem } from '@app/types/entities/exame-item.entity';
import { Exame } from '@app/types/entities/exame.entity';
import { ResultadoExameItem } from '@app/types/entities/resultado-exame.entity';
import { Usuario } from '@app/types/entities/usuario.entity';
import { ExameItemService } from '@modules/exame-item/exame-item.service';
import { ExameService } from '@modules/exame/exame.service';
import { MetricaService } from '@modules/metrica/metrica.service';
import { LimiteService } from '@modules/metrica/modules/limite/limite.service';
import { PdfManipulatorService } from '@modules/pdf-manipulator/pdf-manipulator.service';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
var examesMock = require('./mock/examesMock.json');
var exameItemsFromAllExamesResponse = require('./mock/exameItemsFromAllExamesResponse.mock.json');
var exameItemsMock = require('./mock/exameItemsMock.json');

const usuarioEntity = new Usuario({
  id: 1,
  nome: 'Thiago Sanches',
  idade: 22,
  email: 'thi.sanches@hotmail.com',
  sexo: 'masculino',
  senha: 'umasenhacomum',
});
const exameEntity = new Exame({
  id: 1,
  data: '30/05/2023',
  itens: [],
  user: usuarioEntity,
});
let exameItemService: ExameItemService;
let metricaService: MetricaService;
let limiteService: LimiteService;
let resultadoMockRepository: Partial<Repository<ResultadoExameItem>>;
let exameRepositoryMock;
let exameItemMockRepository: Partial<Repository<ExameItem>>;
let exameService: ExameService;

describe('ExameService', () => {
  beforeEach(async () => {
    exameRepositoryMock = {
      create: jest.fn().mockResolvedValue(exameEntity),
      save: jest.fn().mockResolvedValue(exameEntity),
      findOne: jest.fn(),
      find: jest.fn().mockReturnValue(examesMock),
    };

    exameItemMockRepository = {
      find: jest.fn().mockReturnValue(exameItemsMock),
    };

    exameItemService = new ExameItemService(
      exameItemMockRepository as Repository<ExameItem>,
      resultadoMockRepository as Repository<ResultadoExameItem>,
      metricaService,
      limiteService,
    );
    exameService = new ExameService(
      exameRepositoryMock as Repository<Exame>,
      exameItemService,
      metricaService,
      new PdfManipulatorService(),
    );
  });

  it('deve estar definido', () => {
    expect(exameService).toBeDefined();
  });

  describe('createExame', () => {
    it('Deve criar um exame', async () => {
      const exameCreated = await exameService.createExame(
        usuarioEntity,
        '30/05/2023',
      );
      expect(exameCreated.id).toBe(exameEntity.id);
      expect(exameCreated.user.nome).toBe(exameEntity.user.nome);
    });
    it('Deve dar BAD REQUEST ao criar um exame', async () => {
      jest.spyOn(exameRepositoryMock, 'save').mockResolvedValueOnce(null);
      try {
        const exameCreated = await exameService.createExame(
          usuarioEntity,
          '30/05/2023',
        );
      } catch (error) {
        // Verifique a mensagem de erro capturada
        expect(error.message).toBe('Exame was not created');
      }
    });
  });

  describe('getExameById', () => {
    it('deve retornar o exame corretamente quando encontrado', async () => {
      const exameId = '1';
      const exameEntity = new Exame();
      exameRepositoryMock.findOne.mockResolvedValueOnce(exameEntity);

      const exame = await exameService.getExameById(exameId);

      expect(exameRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: parseInt(exameId) },
      });
      expect(exame).toBe(exameEntity);
    });

    it('deve lançar um erro NotFoundException quando o exame não for encontrado', async () => {
      const exameId = '1';
      exameRepositoryMock.findOne.mockResolvedValueOnce(undefined);

      await expect(exameService.getExameById(exameId)).rejects.toThrowError(
        NotFoundException,
      );

      expect(exameRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: parseInt(exameId) },
      });
    });
  });

  describe('populateMapWithItems', () => {
    it('deve retornar um map populado corretamente', () => {
      const pdfPagesStringArray = [
        'Page 1 Metrica1 10',
        'Page 2 Metrica2 20',
        'Page 3 Metrica3 30',
      ];
      const metricas = [
        { nome: 'Metrica1', unidade: 'Unidade1' },
        { nome: 'Metrica2', unidade: 'Unidade2' },
        { nome: 'Metrica3', unidade: 'Unidade3' },
      ];

      const result = exameService.populateMapWithItems(
        pdfPagesStringArray,
        metricas,
      );

      expect(result).toBeInstanceOf(Map);

      // Verificar se as chaves e valores estão corretos
      expect(result.get('Metrica1')).toEqual({
        valor: 10,
        unidade: 'Unidade1',
      });
      expect(result.get('Metrica2')).toEqual({
        valor: 20,
        unidade: 'Unidade2',
      });
      expect(result.get('Metrica3')).toEqual({
        valor: 30,
        unidade: 'Unidade3',
      });
    });
  });

  describe('createMapBasedOnPdf', () => {
    it('deve criar um mapa corretamente', () => {
      const pdfPagesStringArray = [
        'HDL RESULTADO 50',
        'LDL RESULTADO: 100',
        'T3 R E S U L T A D O 10',
        'T4 ReSuLtAdOs: 20',
      ];
      const metricasByName = ['HDL', 'LDL', 'T3', 'T4'];
      const unidadeMetricasSet = new Map<string, string>([
        ['HDL', 'mg/dL'],
        ['LDL', 'mg/dL'],
        ['T3', 'mg/dL'],
        ['T4', 'mg/dL'],
      ]);
      const itensMap = new Map<string, { valor: number; unidade: string }>();

      exameService.createMapBasedOnPdf(
        pdfPagesStringArray,
        metricasByName,
        unidadeMetricasSet,
        itensMap,
      );

      expect(itensMap.size).toBe(4);
      expect(itensMap.get('HDL')).toEqual({ valor: 50, unidade: 'mg/dL' });
      expect(itensMap.get('LDL')).toEqual({ valor: 100, unidade: 'mg/dL' });
      expect(itensMap.get('T3')).toEqual({ valor: 10, unidade: 'mg/dL' });
      expect(itensMap.get('T4')).toEqual({ valor: 20, unidade: 'mg/dL' });
    });
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
