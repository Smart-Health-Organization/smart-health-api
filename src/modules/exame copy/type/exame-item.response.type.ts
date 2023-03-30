export class ExameItemResponseType{

    id: number
    
    metrica:string

    medida:string

    unidade:string
}

export class ArrayOfExameItemResponseType extends Array<ExameItemResponseType>{}