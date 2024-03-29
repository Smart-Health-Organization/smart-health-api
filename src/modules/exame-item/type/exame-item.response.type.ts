import { ResultadoExameItem } from '@app/types/entities/resultado-exame.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ExameItemResponseType {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'colesterol',
  })
  metrica: string;

  @ApiProperty({
    example: 100,
  })
  medida: number;

  @ApiProperty({
    example: 'mg/L',
  })
  unidade: string;

  resultado: ResultadoExameItem;
}

export class ArrayOfExameItemResponseType extends Array<ExameItemResponseType> {}
