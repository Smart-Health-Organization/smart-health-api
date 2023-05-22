import { Exame } from '@app/types/entities/exame.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResultadoExameItem } from './resultado-exame.entity';

@ObjectType()
@Entity()
export class ExameItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'colesterol',
  })
  metrica: string;

  @Column('float')
  @ApiProperty({
    example: 200,
  })
  medida: number;

  @Column()
  @ApiProperty({
    example: 'mg/dL',
  })
  unidade: string;

  @ManyToOne(() => Exame, (exame) => exame.itens, { onDelete: 'CASCADE' })
  exame: Exame;

  @OneToOne(() => ResultadoExameItem, { cascade: true })
  @JoinColumn()
  resultado: ResultadoExameItem;
}
