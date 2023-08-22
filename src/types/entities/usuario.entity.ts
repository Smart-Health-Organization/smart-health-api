import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { Exame } from '@app/types/entities/exame.entity';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from '../../helpers/crypto';

@ObjectType()
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Thiago Sanches',
  })
  nome: string;

  @Column()
  @ApiProperty({
    type: '07/03/2001',
  })
  dataDeNascimento: string;

  @Column()
  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'masculino',
  })
  sexo: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  senha: string;

  @OneToMany(() => Exame, (exame) => exame.user, { cascade: true })
  @ApiProperty({
    type: [Exame],
  })
  exames: Exame[];

  @OneToMany(
    () => ExameCompartilhado,
    (exameCompartilhado) => exameCompartilhado.usuario,
    { cascade: true },
  )
  @ApiProperty({
    type: [ExameCompartilhado],
  })
  examesCompartilhados: ExameCompartilhado[];
}
