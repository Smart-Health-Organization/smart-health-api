import {
  ArrayOfExameItemResponseType,
  ExameItemResponseType,
} from '@modules/exame copy/type/exame-item.response.type';
import { ApiProperty } from '@nestjs/swagger';

export class ExameAndExameItemsResponseType {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Thu Mar 30 2023 17:19:08 GMT-0300 (Brasilia Standard Time)',
  })
  data: string;

  @ApiProperty({
    type: [ExameItemResponseType],
  })
  itens: ArrayOfExameItemResponseType;
}

export class ExamesAndExameItemsResponseType extends Array<ExameAndExameItemsResponseType> {}
