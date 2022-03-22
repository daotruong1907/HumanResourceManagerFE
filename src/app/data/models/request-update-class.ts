export class DataUpdateClass {
    id: number
    name: string
    birthDay?: Date
    sex: string
    phoneNumber: string
    email: string
}
export class ParamUpdateEmployeeDto {
    id: number
    name: string
    birthDay?: Date
    sex: string
    phoneNumber: string
    email: string
    repairer: string
    updateAt?: Date
}
export class ResponseUpdateEmployee {
    paramUpdateEmployeeDto: ParamUpdateEmployeeDto
    responseFromServer: string
    isSuccess: boolean
}