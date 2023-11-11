import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Usuario } from './usuario.entity';

import { Antropometria } from '@app/types/entities/antropometria.entity';
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

  @Column('float')
  @ApiProperty({
    example: 10,
  })
  massaMagra: number;

  @Column('float')
  @ApiProperty({
    example: 15,
  })
  gorduraCorporal: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.exames, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @OneToMany(() => Antropometria, (antropometria) => antropometria.meta, {
    cascade: true,
  })
  @ApiProperty({
    type: [Antropometria],
  })
  antropometrias: Antropometria[];

  @Column()
  @ApiProperty({
    example: false,
  })
  isConcluida: boolean;
}
