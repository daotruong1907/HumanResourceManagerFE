import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginInterface } from '../models/Login-interface';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  getData(params: LoginInterface) {
    return this.http.post<boolean>('https://localhost:7105/api/Login/Login',params)
  }
}
