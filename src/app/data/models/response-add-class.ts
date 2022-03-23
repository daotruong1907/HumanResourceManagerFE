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
    creatorId: string
    createAt: Date
    repairerId: string
    updateAt: Date
}
export class ResponseAddAccount {
    id: 0
    passWord: string
    creatorId: string
    createAt: Date
    updateAt: Date
}
