import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Usuario } from './usuario.entity';

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

  @OneToMany(() => ExameItem, (exameItem) => exameItem.exame, { cascade: true })
  itens: ExameItem[];

  @ManyToOne(() => Usuario, (usuario) => usuario.exames, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  constructor(exame?: Partial<Exame>) {
    this.id = exame?.id;
    this.data = exame?.data;
    this.itens = exame?.itens;
    this.usuario = exame?.usuario;
  }
}
