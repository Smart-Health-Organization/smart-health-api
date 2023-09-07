import { Meta } from '@app/types/entities/meta.entity';
import { MetaAssembler } from '@modules/metas/assembler/meta.assembler';
import metaMock from './mock/metaMock.json';
import metaResponseMock from './mock/metaResponseMock.json';
describe('MetaAssembler', () => {
  describe('assembleMetaToResponse', () => {
    it('deve retornar uma MetaResponseDto', () => {
      const response = MetaAssembler.assembleMetaToResponse(
        metaMock as unknown as Meta,
      );
      expect(response).toEqual(metaResponseMock);
    });
  });
  describe('assembleMetasToResponse', () => {
    it('deve retornar MetaResponseDto[]', () => {
      const response = MetaAssembler.assembleMetasToResponse([
        metaMock,
      ] as unknown as Meta[]);
      expect(response).toEqual([metaResponseMock]);
    });
  });
});
