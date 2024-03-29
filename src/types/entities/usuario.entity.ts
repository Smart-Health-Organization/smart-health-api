import { ExameCompartilhado } from '@app/types/entities/exame-compartilhado.entity';
import { Exame } from '@app/types/entities/exame.entity';
import { Meta } from '@app/types/entities/meta.entity';
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
    type: '2001-07-03T00:00:00.000Z',
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

  @OneToMany(() => Exame, (exame) => exame.usuario, { cascade: true })
  @ApiProperty({
    type: [Exame],
  })
  exames: Exame[];

  @OneToMany(() => Meta, (meta) => meta.usuario, { cascade: true })
  @ApiProperty({
    type: [Meta],
  })
  metas: Meta[];

  @OneToMany(
    () => ExameCompartilhado,
    (exameCompartilhado) => exameCompartilhado.usuario,
    { cascade: true },
  )
  @ApiProperty({
    type: [ExameCompartilhado],
  })
  examesCompartilhados: ExameCompartilhado[];

  constructor(usuario?: Partial<Usuario>) {
    this.id = usuario?.id;
    this.nome = usuario?.nome;
    this.dataDeNascimento = usuario?.dataDeNascimento;
    this.email = usuario?.email;
    this.sexo = usuario?.sexo;
    this.senha = usuario?.senha;
    this.exames = usuario?.exames;
  }
}
