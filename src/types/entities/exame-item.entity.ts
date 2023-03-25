import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Exame } from 'src/types/entities/exame.entity';
import {
  Column,
  Entity,
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

  @Column()
  @ApiProperty({
    example: 200,
  })
  medida: string;

  @Column()
  @ApiProperty({
    example: 'mg/dL',
  })
  unidade: string;

  @ManyToOne(() => Exame, (exame) => exame.itens)
  exame: Exame;

  @OneToOne(() => ResultadoExameItem)
  retultado: ResultadoExameItem;
}
