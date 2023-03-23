import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: [ExameItem],
  })
  exameItens: ExameItem[];

  @ManyToOne(() => User, (user) => user.exames)
  user: User;
}
