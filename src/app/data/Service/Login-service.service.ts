import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginInterface,Responselogin } from '../models/Login-interface';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  getData(params: LoginInterface) {
    return this.http.post<Responselogin>('https://localhost:7105/api/Login/Login',params)
  }
}
