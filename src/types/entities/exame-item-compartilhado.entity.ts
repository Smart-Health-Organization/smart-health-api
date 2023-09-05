import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ExameItemCompartilhado {
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

  @Column()
  unidade: string;

  @Column()
  isAtual: boolean;

  @Column()
  isAlterado: boolean;

  @ManyToOne(() => ExameCompartilhado, (exame) => exame.itens, {
    onDelete: 'CASCADE',
  })
  exameCompartilhado: ExameCompartilhado;
}
