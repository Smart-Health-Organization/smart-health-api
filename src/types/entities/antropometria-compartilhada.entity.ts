import { MacronutrienteCompartilhado } from '@app/types/entities/macronutriente-compartilhado.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class AntropometriaCompartilhada {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    example: '21/03/2001',
  })
  data: string;

  @Column()
  @ApiProperty({
    example: 172,
  })
  altura: number;

  @Column()
  @ApiProperty({
    example: 80,
  })
  peso: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  densidadeCorporal: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  gorduraCorporal: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  massaMagra: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  caloriasDiarias: number;

  @Column()
  @ApiProperty({
    example: 15,
  })
  atividadeFisicaSemanal: number;

  // @ManyToOne(
  //   () => MetaCompartilhada,
  //   (meta) => meta.antropometriasCompartilhadas,
  //   { onDelete: 'CASCADE' },
  // )
  // metaCompartilhada: MetaCompartilhada;

  @OneToMany(
    () => MacronutrienteCompartilhado,
    (macro) => macro.antropometriaCompartilhada,
    {
      cascade: true,
    },
  )
  @ApiProperty({
    type: [MacronutrienteCompartilhado],
  })
  macronutrientesCompartilhados: MacronutrienteCompartilhado[];
}
