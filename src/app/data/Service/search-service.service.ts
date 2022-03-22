import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchInterface } from '../models/search-interface';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EmployeeInfomationInterface } from '../models/employeeInfomation-interface';
import { ResponseSearchInterface } from '../models/Response-search-interface';
import { DataUpdateClass } from '../models/request-update-class';
@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) { }

  search(param: SearchInterface) {
    return this.http.post<ResponseSearchInterface>("https://localhost:7105/api/EmployeeInformation/SearchEmployee", param)
  }

  delete(param: number) {
    return this.http.delete<boolean>("https://localhost:7105/api/EmployeeInformation/DeleteEmployee?id=" + param)
  }
  getUserById(id: number) {
    return this.http.get<DataUpdateClass>("https://localhost:7105/api/EmployeeInformation/GetEmployeeeById?id=" + id)
  }
}
