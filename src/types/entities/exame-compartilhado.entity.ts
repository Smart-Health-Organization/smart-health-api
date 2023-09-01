import { ExameItemCompartilhado } from '@app/types/entities/exame-item-compartilhado.entity';
import { MetaCompartilhada } from '@app/types/entities/meta-compartilhada.entity';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashPasswordTransform } from '../../helpers/crypto';

@ObjectType()
@Entity()
export class ExameCompartilhado {
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
  titulo: string;

  @Column()
  @ApiProperty({
    example: 'Thiago Sanches',
  })
  login: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  senha: string;

  @ManyToOne(() => Usuario, (user) => user.examesCompartilhados, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    type: Usuario,
  })
  usuario: Usuario;

  @OneToMany(
    () => ExameItemCompartilhado,
    (itemCompartilhado) => itemCompartilhado.exameCompartilhado,
    { cascade: true },
  )
  itens?: ExameItemCompartilhado[];

  @OneToOne(() => MetaCompartilhada, { cascade: true })
  meta: MetaCompartilhada;
}
