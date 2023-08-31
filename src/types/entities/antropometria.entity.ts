import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Macronutriente } from '@app/types/entities/macronutriente.entity';
import { MedidasParaCalculo } from '@app/types/entities/medidas-para-calculo';
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
export class Antropometria extends MedidasParaCalculo {
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

  @Column('float')
  @ApiProperty({
    example: 80,
  })
  peso: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  densidadeCorporal: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  gorduraCorporal: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  massaMagra: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  taxaMetabolicaBasal: number;

  @Column('float')
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
