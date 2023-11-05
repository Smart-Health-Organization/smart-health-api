import { ExameItemCompartilhadoInsertDto } from '@app/types/dtos/insert/exame-item-compartilhado.insert.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ExameCompartilhadoInsertDto {
  titulo: string;

  senha: string;

  itens: ExameItemCompartilhadoInsertDto[];
}

type Item = {
  data: Date;
  medida: number;
  unidade: string;
  isAtual: boolean;
  isAlterado: boolean;
};

export type ExameItemsMapResponseData = Record<string, Item[]>;
