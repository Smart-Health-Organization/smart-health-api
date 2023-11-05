import { Antropometria } from '@app/types/entities/antropometria.entity';
import { AntropometriaAssembler } from '@modules/metas/modules/antropometria/assembler/antropometria.assembler';
import antropometriaMock from './mock/antropometriaMock.json';
import antropometriaResponseMock from './mock/antropometriaResponseMock.json';
import antropometriasMock from './mock/antropometriasMock.json';
import comparativosMock from './mock/comparativosMock.json';

describe('AntropometriaAssembler', () => {
  describe('assembleAntropometriaToResponse', () => {
    it('deve retornar AntropometriaResponseDto', () => {
      const response = AntropometriaAssembler.assembleAntropometriaToResponse(
        antropometriaMock as unknown as Antropometria,
      );
      expect(response).toStrictEqual(antropometriaResponseMock);
    });
  });
  describe('assembleAntropometriasToResponse', () => {
    it('deve retornar AntropometriaResponseDto[]', () => {
      const response = AntropometriaAssembler.assembleAntropometriasToResponse([
        antropometriaMock,
      ] as unknown as Antropometria[]);
      expect(response).toStrictEqual([antropometriaResponseMock]);
    });
  });
  describe('assembleComparativos', () => {
    it('deve retornar AntropometriaComparativoResponseData', () => {
      const response =
        AntropometriaAssembler.assembleComparativos(antropometriasMock);
      Object.keys(response).forEach((key) => {
        comparativosMock[key].forEach((element) => {
          element.data = new Date('2001-03-22T00:00:00.000Z');
        });
      });
      expect(response).toStrictEqual(comparativosMock);
    });
  });
});
