import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestAddClass } from '../models/Request-add-class';
import { ResponseAddClass } from '../models/response-add-class';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeServiceService {

  constructor(private http: HttpClient) { }

  add(params: RequestAddClass)
  {
    return this.http.post<ResponseAddClass>("https://localhost:7105/api/EmployeeInformation/AddEmployee", params)
  }
}

