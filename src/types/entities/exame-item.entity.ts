import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exame } from 'src/types/entities/exame.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ExameItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  metrica: string;

  @Column()
  medida: string;

  @Column()
  unidade: string;

  @ManyToOne(() => Exame, (exame) => exame.itens)
  exame: Exame;
}
