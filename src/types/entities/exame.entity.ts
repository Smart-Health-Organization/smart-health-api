import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

import { ExameItem } from '@app/types/entities/exame-item.entity';
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
export class Exame {
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

  @OneToMany(() => ExameItem, (exameItem) => exameItem.exame)
  itens: ExameItem[];

  @ManyToOne(() => User, (user) => user.exames)
  user: User;
}
