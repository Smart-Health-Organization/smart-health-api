import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Exame } from 'src/types/entities/exame.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from './../../helpers/crypto';

@ObjectType()
@Entity()
export class User {
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
  name: string;

  @Column()
  @ApiProperty({
    example: 22,
  })
  age: number;

  @Column()
  @ApiProperty({
    example: 'thi.sanches@hotmail.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'thisanches07',
  })
  login: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;

  @OneToMany(() => Exame, (exame) => exame.user)
  @ApiProperty({
    type: [Exame],
  })
  exames: Exame[];
}
