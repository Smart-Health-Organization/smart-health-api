import { InputType } from '@nestjs/graphql';

@InputType()
export class ExameItemCompartilhadoInsertDto {
  nome: string;

  data: Date;

  medida: number;

  unidade: string;

  isAtual: boolean;

  isAlterado: boolean;
}
