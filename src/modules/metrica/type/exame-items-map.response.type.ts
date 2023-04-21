import { ApiProperty } from '@nestjs/swagger';

type Item = {
  data: Date;
  medida: number;
  isAtual: boolean;
  isAlterado: 'todo' | null;
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
          isAlterado: { type: 'string', enum: ['todo', null] },
        },
      },
    },
  })
  data: ExameItemsMapResponseData;
}
