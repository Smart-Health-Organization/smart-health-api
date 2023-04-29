import { ApiProperty } from '@nestjs/swagger';

type Item = {
  data: Date;
  medida: number;
  isAtual: boolean;
  isAlterado: 'true' | null;
};

type ExameItemsMapResponseData = Record<string, Item[]>;

export class ExameItemsMapResponseType {
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          data: { type: 'string', format: 'date-time' },
          medida: { type: 'number' },
          isAtual: { type: 'boolean' },
          isAlterado: { type: 'boolean' },
        },
      },
    },
  })
  data: ExameItemsMapResponseData;
}
