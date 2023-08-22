import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Bioimpedancia } from '@app/types/entities/bioimpedancia.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Macronutriente {
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
    () => Bioimpedancia,
    (bioimpedancia) => bioimpedancia.macronutrientes,
    { onDelete: 'CASCADE' },
  )
  bioimpedancia: Bioimpedancia;
}
