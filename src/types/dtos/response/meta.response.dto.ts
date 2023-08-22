import { BioimpedanciaResponseDto } from '@app/types/dtos/response/bioimpedancia.response.dto';
import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class MetaResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Minha primeira meta',
  })
  titulo: string;

  @ApiProperty({
    type: '07/03/2001',
  })
  dataInicio: string;

  @ApiProperty({
    example: '07/03/2001',
  })
  dataFim: string;

  @ApiProperty({
    type: BioimpedanciaResponseDto,
  })
  bioimpedancias: BioimpedanciaResponseDto;
}
