import { Usuario } from '@app/types/entities/usuario.entity';
import { Field, InputType } from '@nestjs/graphql';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateExameInsertDto {
  @Field()
  @IsString({ message: 'Data deve ser um texto' })
  @IsNotEmpty({ message: 'Data é obrigatória' })
  @IsISO8601(
    { strict: true },
    { message: 'Data de exame deve ser uma data válida' },
  )
  data: string;

  user: Usuario;
}
