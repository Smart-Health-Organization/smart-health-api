import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ApiProperty } from '@nestjs/swagger';
import { Metrica } from 'src/types/entities/metrica.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Limite {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ManyToOne(() => Metrica, (metrica) => metrica.limites)
  metrica: Metrica;

  @Column()
  @ApiProperty({
    example: 'feminino',
  })
  sexo: string;

  @Column()
  @ApiProperty({
    example: '2',
  })
  idadeInicio: number;
  @Column()
  @ApiProperty({
    example: '19',
  })
  idadeFim: number;

  @Column()
  @ApiProperty({
    example: '100',
  })
  alto: number;

  @Column()
  @ApiProperty({
    example: '20',
  })
  baixo: number;

  @Column()
  @ApiProperty({
    example: 'mg/dL',
  })
  unidade: string;
}
