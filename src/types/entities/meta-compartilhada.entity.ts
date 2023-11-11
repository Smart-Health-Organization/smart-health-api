import { ComparativoCompartilhado } from '@app/types/entities/comparativo-compartilhado.entity';
import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
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
export class MetaCompartilhada {
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

  @ManyToOne(() => ExameCompartilhado, (exame) => exame.meta, {
    onDelete: 'CASCADE',
  })
  exameCompartilhado: ExameCompartilhado;

  @OneToMany(
    () => ComparativoCompartilhado,
    (comparativo) => comparativo.metaCompartilhada,
    { cascade: true },
  )
  comparativos?: ComparativoCompartilhado[];
}
