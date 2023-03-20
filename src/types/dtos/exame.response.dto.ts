import { InputType } from '@nestjs/graphql';
import { IdAndNameResponseType } from 'src/types/id-and-name.response';

@InputType()
export class ExameResponseDto {
  id: number;

  data: string;

  itens: string;

  user: IdAndNameResponseType;
}
