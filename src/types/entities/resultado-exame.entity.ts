import { ExameItem } from '@app/types/entities/exame-item.entity';
import { Metrica } from '@app/types/entities/metrica.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ResultadoExameItem {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @OneToOne(() => ExameItem, (exameItem) => exameItem.resultado)
  exameItem: ExameItem;

  @OneToOne(() => Metrica)
  metrica: Metrica;
}
