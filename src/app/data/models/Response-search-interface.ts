export class ResponseSearchInterface {
    responseSearchEmployees: ResponseSearchEmployee[]
    responseFromServer: string

}
export class ResponseSearchEmployee {
    id: number
    name: string
    birthDay: string
    sex: string
    phoneNumber: string
    email: string
}
