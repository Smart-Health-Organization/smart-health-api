import { ComparativoCompartilhado } from '@app/types/entities/comparativo-compartilhado.entity';
import { ComparativoCompartilhadoAssembler } from '@modules/comparativo-compartilhado/assembler/comparativo-compartilhado.assembler';
import comparativoCompartilhadoMock from './mock/comparativoCompartilhadoMock.json';
import comparativoCompartilhadoResponseMock from './mock/comparativoCompartilhadoResponse.json';
describe('ComparativoCompartilhadoAssembler', () => {
  describe('assembleComparativoCompartilhadoEntityToResponseType', () => {
    it('should return an object with all properties', () => {
      const response =
        ComparativoCompartilhadoAssembler.assembleComparativoCompartilhadoEntityToResponseType(
          comparativoCompartilhadoMock as unknown as ComparativoCompartilhado[],
        );
      expect(response).toEqual(comparativoCompartilhadoResponseMock);
    });
  });
});
