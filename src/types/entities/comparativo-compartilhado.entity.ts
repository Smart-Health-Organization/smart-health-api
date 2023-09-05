import { MetaCompartilhada } from '@app/types/entities/meta-compartilhada.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ComparativoCompartilhado {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  nome: string;

  @Column()
  data: Date;

  @Column('float')
  medida: number;

  @ManyToOne(() => MetaCompartilhada, (meta) => meta.comparativos, {
    onDelete: 'CASCADE',
  })
  metaCompartilhada: MetaCompartilhada;
}
