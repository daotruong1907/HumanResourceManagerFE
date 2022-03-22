import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUpdateClass, ResponseUpdateEmployee } from '../models/request-update-class';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeServiceService {

  constructor(private http: HttpClient) { }
  update(param: any) {
    return this.http.post<ResponseUpdateEmployee>("https://localhost:7105/api/EmployeeInformation/UpdateEmployee", param)
  }

  getUserById(id: number) {
    return this.http.get<DataUpdateClass>("https://localhost:7105/api/EmployeeInformation/GetEmployeeeById?id=" + id)
  }
}

