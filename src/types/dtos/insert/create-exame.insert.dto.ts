import { Usuario } from '@app/types/entities/usuario.entity';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateExameInsertDto {
  @Field()
  @IsString({ message: 'Data deve ser um texto' })
  @IsNotEmpty({ message: 'Data é obrigatória' })
  data: string;

  user: Usuario;
}
