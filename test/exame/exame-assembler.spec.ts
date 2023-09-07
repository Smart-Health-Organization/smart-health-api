import { Exame } from '@app/types/entities/exame.entity';
import { ExameAssembler } from '@modules/exame/assembler/exame-assembler';
import createExameMock from './mock/createExameMock.json';
import createExameResponseMock from './mock/createExameResponseMock.json';
import pdfItensMock from './mock/pdfItensMock.json';
import pdfItensResponseMock from './mock/pdfItensResponseMock.json';
describe('ExameAssembler', () => {
  describe('assembleCreateExameToDto', () => {
    it('deve retornar ExameResponseDto', () => {
      const response = ExameAssembler.assembleCreateExameToDto(
        createExameMock as unknown as Exame,
      );
      expect(response).toEqual(createExameResponseMock);
    });
  });
  describe('assemblePdfExameToInsertExameItems', () => {
    it('deve retornar ItemsDoExameResponseType', () => {
      const response =
        ExameAssembler.assemblePdfExameToInsertExameItems(pdfItensMock);
      expect(response).toEqual(pdfItensResponseMock);
    });
  });
});
