import { ObjectType } from '@nestjs/graphql';

import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

@ObjectType()
export class MedidasParaCalculo {
  @Column('float')
  @ApiProperty({
    example: 15,
  })
  suprailiaca: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  abdominal: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  triceps: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  coxa: number;
}
