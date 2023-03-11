import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashPasswordTransform } from './../../helpers/crypto';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;
}
