import { ExameItemCompartilhado } from '@app/types/entities/exame-item-compartilhado.entity';
import { ExameItemCompartilhadoAssembler } from '@modules/exame-item-compartilhado/assembler/exame-item-compartilhado.assembler';
import examesItensCompartilhadosMock from './mock/examesItensCompartilhadosMock.json';
describe('ExameItemCompartilhadoAssembler', () => {
  describe('assembleItemEntityToResponseType', () => {
    it('deve retornar ExameItemCompartilhadoInsertDto[]', () => {});
    const response =
      ExameItemCompartilhadoAssembler.assembleItemEntityToResponseType(
        examesItensCompartilhadosMock as unknown as ExameItemCompartilhado[],
      );

    expect(response).toEqual({
      HDL: [
        {
          data: '2023-05-30T03:00:00.000Z',
          medida: 42,
          unidade: 'mg/dL',
          isAtual: true,
          isAlterado: true,
        },
        {
          data: '2023-05-30T03:00:00.000Z',
          medida: 42,
          unidade: 'mg/dL',
          isAtual: true,
          isAlterado: true,
        },
      ],
      TSH: [
        {
          data: '2023-05-30T03:00:00.000Z',
          medida: 1.43,
          unidade: 'µUI/mL',
          isAtual: true,
          isAlterado: true,
        },
      ],
    });
  });
});
