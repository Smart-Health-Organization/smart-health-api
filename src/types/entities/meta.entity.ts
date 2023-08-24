import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Usuario } from './usuario.entity';

import { Bioimpedancia } from '@app/types/entities/bioimpedancia.entity';
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
export class Meta {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Apenas um titulo',
  })
  titulo: string;

  @Column()
  @ApiProperty({
    example: '21/03/2001',
  })
  dataInicio: Date;

  @Column()
  @ApiProperty({
    example: '21/03/2001',
  })
  dataFim: Date;

  @Column()
  @ApiProperty({
    example: 10,
  })
  massaMagra: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  gorduraCorporal: number;

  @ManyToOne(() => Usuario, (user) => user.exames, { onDelete: 'CASCADE' })
  user: Usuario;

  @OneToMany(() => Bioimpedancia, (bioimpedancia) => bioimpedancia.meta, {
    cascade: true,
  })
  @ApiProperty({
    type: [Bioimpedancia],
  })
  bioimpedancias: Bioimpedancia[];

  @Column()
  @ApiProperty({
    example: false,
  })
  isConcluida: boolean;
}
