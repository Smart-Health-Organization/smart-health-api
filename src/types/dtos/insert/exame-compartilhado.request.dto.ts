import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class ExameCompartilhadoInsertDto {
  @IsString({ message: 'O título deve ser um texto' })
  @ApiProperty({
    example: 'Um título qualquer',
  })
  titulo: string;

  @IsString({ message: 'Senha deve ser um texto' })
  @ApiProperty({
    example: 'Senha',
  })
  senha: string;

  @IsString({ message: 'Confirmação da senha ser um texto' })
  @ApiProperty({
    example: 'ConfirmacaoSenha',
  })
  confirmacaoSenha: string;

  @ApiProperty()
  itens: ExameItemsMapResponseData;
}

type Item = {
  data: Date;
  medida: number;
  unidade: string;
  isAtual: boolean;
  isAlterado: boolean;
};

export type ExameItemsMapResponseData = Record<string, Item[]>;
