import { ApiProperty } from '@nestjs/swagger';

export class AntropometriaResponseDto {
  @ApiProperty({ example: 1 })
  altura: number;

  @ApiProperty({ example: 1 })
  peso: number;

  @ApiProperty({ example: 1 })
  atividadeFisicaSemanal: number;

  @ApiProperty({ example: '2001-03-07T00:00:00.000Z' })
  data: string;

  @ApiProperty({ example: 1 })
  coxa: number;

  @ApiProperty({ example: 1 })
  abdominal: number;

  @ApiProperty({ example: 1 })
  triceps: number;

  @ApiProperty({ example: 1 })
  suprailiaca: number;

  @ApiProperty({ example: 1 })
  densidadeCorporal: number;

  @ApiProperty({ example: 1 })
  gorduraCorporal: number;

  @ApiProperty({ example: 1 })
  massaMagra: number;

  @ApiProperty({ example: 1 })
  caloriasDiarias: number;
}
