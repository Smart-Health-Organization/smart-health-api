import { ExameItem } from '@app/types/entities/exame-item.entity';
import { Limite } from '@app/types/entities/limite.entity';
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

@ObjectType()
@Entity()
export class ResultadoExameItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @OneToOne(() => ExameItem, (exameItem) => exameItem.resultado)
  exameItem: ExameItem;

  @ManyToOne(() => Limite)
  @JoinColumn()
  limite: Limite;

  @Column()
  alterado: boolean;
}
