import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

import { ExameItem } from 'src/types/entities/exame-item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  data: string;

  @OneToMany(() => ExameItem, (exameItem) => exameItem.exame)
  itens: ExameItem[];

  @ManyToOne(() => User, (user) => user.exames)
  user: User;
}
