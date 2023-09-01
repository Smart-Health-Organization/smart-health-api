import { InputType } from '@nestjs/graphql';

@InputType()
export class ComparativoCompartilhadoInsertDto {
  nome: string;

  data: Date;

  medida: number;
}
