import { ObjectType } from '@nestjs/graphql';

import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

@ObjectType()
export class MedidasParaCalculo {
  @Column()
  @ApiProperty({
    example: 15,
  })
  suprailiaca: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  abdominal: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  triceps: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  coxa: number;
}
