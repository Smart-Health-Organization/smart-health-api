import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Macronutriente } from '@app/types/entities/macronutriente.entity';
import { Meta } from '@app/types/entities/meta.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Antropometria {
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

  @Column()
  @ApiProperty({
    example: 172,
  })
  altura: number;

  @Column()
  @ApiProperty({
    example: 80,
  })
  peso: number;

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

  @Column()
  @ApiProperty({
    example: 15,
  })
  densidadeCorporal: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  gorduraCorporal: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  caloriasDiarias: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  atividadeFisicaSemanal: number;

  @ManyToOne(() => Meta, (meta) => meta.antropometrias, { onDelete: 'CASCADE' })
  meta: Meta;

  @OneToMany(() => Macronutriente, (macro) => macro.antropometria, {
    cascade: true,
  })
  @ApiProperty({
    type: [Macronutriente],
  })
  macronutrientes: Macronutriente[];
}
