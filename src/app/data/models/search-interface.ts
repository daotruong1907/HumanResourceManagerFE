export interface SearchInterface {
    PageDto: PageDto
    ParamSearchEmployee: ParamSearchEmployee
}
 export class ParamSearchEmployee {
    NameOrEmail: string
    FromBirthDay?: Date
    ToBirthDay?: Date
    Sex: number
    PhoneNumber: string
}
export class PageDto {
    PageQuantity: number
    ItemQuantityInPage: number
}

