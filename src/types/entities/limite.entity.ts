import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ApiProperty } from '@nestjs/swagger';
import { Metrica } from 'src/types/entities/metrica.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Limite {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: '21/03/2001',
  })
  data: string;

  @ManyToOne(() => Metrica, (metrica) => metrica.limites)
  metrica: Metrica;
}
