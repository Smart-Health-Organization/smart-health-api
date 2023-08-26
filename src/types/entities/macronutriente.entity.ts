import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Antropometria } from '@app/types/entities/antropometria.entity';
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
    () => Antropometria,
    (antropometria) => antropometria.macronutrientes,
    { onDelete: 'CASCADE' },
  )
  antropometria: Antropometria;
}
