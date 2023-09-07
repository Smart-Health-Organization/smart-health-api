import {
  ExameCompartilhadoInsertDto,
  ExameItemsMapResponseData,
} from '@app/types/dtos/insert/exame-compartilhado.request.dto';
import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { ExameCompartilhadoAssembler } from '@modules/exame-compartilhado/assembler/exame-compartilhado.assembler';
import exameCompartilhadoRequestMock from './mock/exameCompartilhadoRequestMock.json';
import { default as exameCompartilhadoResponseMock } from './mock/exameCompartilhadoResponseMock.json';
import exameItemCompartilhadoMock from './mock/exameItemCompartilhadoMock.json';
import exameItensFormatadosResponseMock from './mock/exameItensFormatadosResponseMock.json';
import examesCompartilhadosMock from './mock/examesCompartilhadosMock.json';
import examesCompartilhadosResponseMock from './mock/examesCompartilhadosResponseMock.json';
describe('ExameCompartilhadoAssembler', () => {
  describe('assembleExameCompartilhadorequestToEntity', () => {
    it('deve retornar ExameCompartilhado', () => {
      const response =
        ExameCompartilhadoAssembler.assembleExameCompartilhadorequestToEntity(
          exameCompartilhadoRequestMock as unknown as ExameCompartilhadoInsertDto,
        );
      exameCompartilhadoResponseMock.login = response.login;
      response.itens.forEach((item) => {
        exameCompartilhadoResponseMock.itens.forEach((itemResponse) => {
          itemResponse.data = item.data;
        });
      });
      expect(response).toStrictEqual(exameCompartilhadoResponseMock);
    });
  });

  describe('assembleExameItemCompartilhadoInsertToEntity', () => {
    it('deve retornar ExameItemCompartilhadoInsertDto[]', () => {
      const response =
        ExameCompartilhadoAssembler.assembleExameItemCompartilhadoInsertToEntity(
          exameItemCompartilhadoMock as unknown as ExameItemsMapResponseData,
        );

      exameItensFormatadosResponseMock.forEach((item) => {
        item.data = new Date(response[0].data);
      });
      expect(response).toStrictEqual(exameItensFormatadosResponseMock);
    });
  });

  describe('assembleExameCompartilhadoInfo', () => {
    it('deve retornar GetUsuarioExamesCompartilhadosResponseType', () => {
      const response =
        ExameCompartilhadoAssembler.assembleExameCompartilhadoInfo(
          examesCompartilhadosMock as unknown as ExameCompartilhado[],
        );
      expect(response).toStrictEqual(examesCompartilhadosResponseMock);
    });
  });
});
