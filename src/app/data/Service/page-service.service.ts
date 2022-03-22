import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageServiceService {

constructor(private http: HttpClient) { }
  getTotalItem(){
    return this.http.get<number>("https://localhost:7105/api/EmployeeInformation/GetCountEmployeee")
  }
}
