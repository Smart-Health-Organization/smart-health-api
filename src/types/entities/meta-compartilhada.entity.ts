import { AntropometriaCompartilhada } from '@app/types/entities/antropometria-compartilhada.entity';
import { Usuario } from '@app/types/entities/usuario.entity';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashPasswordTransform } from '../../helpers/crypto';

@ObjectType()
@Entity()
export class MetaCompartilhada {
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

  @Column()
  @ApiProperty({
    example: '21/03/2001',
  })
  dataInicio: Date;

  @Column()
  @ApiProperty({
    example: '21/03/2001',
  })
  dataFim: Date;

  @Column()
  @ApiProperty({
    example: 10,
  })
  massaMagra: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  gorduraCorporal: number;

  @ManyToOne(() => Usuario, (user) => user.examesCompartilhados, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    type: Usuario,
  })
  usuario: Usuario;

  @OneToMany(
    () => AntropometriaCompartilhada,
    (antropometriaCompartilhada) =>
      antropometriaCompartilhada.metaCompartilhada,
    { cascade: true },
  )
  antropometriasCompartilhadas: AntropometriaCompartilhada[];
}
