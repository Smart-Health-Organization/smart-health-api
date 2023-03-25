import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { ExameItem } from 'src/types/entities/exame-item.entity';
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

  @OneToOne(() => ExameItem, (exameItem) => exameItem.retultado)
  exameItem: ExameItem;
}
