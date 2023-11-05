import { AntropometriaResponseDto } from '@app/types/dtos/response/antropometria.response.dto';
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
    type: '07-03-2001',
  })
  dataInicio: Date;

  @ApiProperty({
    example: '07-03-2001',
  })
  dataFim: Date;

  @ApiProperty({
    example: 10,
  })
  massaMagra: number;

  @ApiProperty({
    example: 15,
  })
  gorduraCorporal: number;

  @ApiProperty({
    type: [AntropometriaResponseDto],
  })
  antropometrias: AntropometriaResponseDto[];

  @ApiProperty({
    example: false,
  })
  isConcluida: boolean;
}

export class GetMetasResponseDto extends Array<MetaResponseDto> {}
