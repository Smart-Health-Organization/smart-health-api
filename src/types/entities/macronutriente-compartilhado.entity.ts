import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AntropometriaCompartilhada } from '@app/types/entities/antropometria-compartilhada.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class MacronutrienteCompartilhado {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Proteína',
  })
  nome: string;

  @Column()
  @ApiProperty({
    example: 20,
  })
  porcentagem: number;

  @Column()
  @ApiProperty({
    example: 80,
  })
  quantidade: number;

  @ManyToOne(
    () => AntropometriaCompartilhada,
    (antropometriaCompartilhada) =>
      antropometriaCompartilhada.macronutrientesCompartilhados,
    { onDelete: 'CASCADE' },
  )
  antropometriaCompartilhada: AntropometriaCompartilhada;
}
