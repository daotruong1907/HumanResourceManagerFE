export class ResponseAddClass {
    responseAddEmployee:ResponseAddEmployee
    responseAddAccount:ResponseAddAccount
    responseFromServer: string
    isSuccess:boolean
}
export class ResponseAddEmployee {
    name: string
    birthDay: Date
    sex: string
    phoneNumber: string
    email: string
    password: string
    creator: string
    createAt: Date
    repairer: string
    updateAt: Date
}
export class ResponseAddAccount {
    id: 0
    passWord: string
    creator: string
    createAt: Date
    updateAt: Date
}
