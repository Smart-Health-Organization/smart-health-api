import { MetaCompartilhada } from '@app/types/entities/meta-compartilhada.entity';
import { Meta } from '@app/types/entities/meta.entity';
import { MetaCompartilhadaAssembler } from '@modules/meta-compartilhada/assembler/meta-compartilhada.assembler';
import { AntropometriaComparativoResponseData } from '@modules/metas/modules/antropometria/type/antropometria-comparativo.response.type';
import comparativosMock from './mock/comparativosMock.json';
import metaCompartilhadaMock from './mock/metaCompartilhadaMock.json';
import metaCompartilharaResponseMock from './mock/metaCompartilharaResponseMock.json';
import metaFormatadaMock from './mock/metaFormatadaMock.json';
import metaMock from './mock/metaMock.json';
describe('MetaCompartilhadaAssembler', () => {
  describe('assembleMetaCompartilhadaEntityToResponseType', () => {
    it('deve retornar uma MetaCompartilhadaResponseType', () => {
      const response =
        MetaCompartilhadaAssembler.assembleMetaCompartilhadaEntityToResponseType(
          metaCompartilhadaMock as unknown as MetaCompartilhada,
        );
      expect(response).toEqual(metaCompartilharaResponseMock);
    });
  });
  describe('assembleMetaCompartilhadaRequestToEntity', () => {
    it('deve retornar uma MetaCompartilhada', () => {
      const response =
        MetaCompartilhadaAssembler.assembleMetaCompartilhadaRequestToEntity(
          comparativosMock as unknown as AntropometriaComparativoResponseData,
          metaMock as unknown as Meta,
        );
      expect(response).toEqual(metaFormatadaMock);
    });
  });

  describe('assembleComparativoCompartilhadoInsertToEntity', () => {
    it('deve retornar uma MetaCompartilhada', () => {
      const response =
        MetaCompartilhadaAssembler.assembleComparativoCompartilhadoInsertToEntity(
          comparativosMock as unknown as AntropometriaComparativoResponseData,
        );
      expect(response).toEqual(metaFormatadaMock.comparativos);
    });
  });
});
