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
    example: 22,
  })
  idade: number;

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

  constructor(usuario?: Partial<Usuario>) {
    this.id = usuario?.id;
    this.nome = usuario?.nome;
    this.idade = usuario?.idade;
    this.email = usuario?.email;
    this.sexo = usuario?.sexo;
    this.senha = usuario?.senha;
    this.exames = usuario?.exames;
  }
}
