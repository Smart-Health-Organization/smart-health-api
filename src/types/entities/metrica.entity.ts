import { Limite } from '@app/types/entities/limite.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Metrica {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Colesterol',
  })
  nome: string;

  @OneToMany(() => Limite, (limite) => limite.metrica)
  limites: Limite[];
}
