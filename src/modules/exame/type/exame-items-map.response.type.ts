type Item = {
  data: Date;
  medida: number;
  isAtual: boolean;
  isAlterado: 'true' | null;
};

type ExameItemsMapResponseData = Record<string, Item[]>;

export class ExameItemsMapResponseType {
  data: ExameItemsMapResponseData;
}
