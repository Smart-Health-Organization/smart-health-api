import { ArrayOfExameItemResponseType } from "@modules/exame copy/type/exame-item.response.type"

export class ExameAndExameItemsResponseType{

    id: number
    data: string
    itens: ArrayOfExameItemResponseType
}

export class ExamesAndExameItemsResponseType extends Array<ExameAndExameItemsResponseType>{}

