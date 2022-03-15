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
    // return this.http.post<LoginInterface>('https://localhost:7105/api/Login/Login')
    // .pipe(
    //   map(res => {return res}),
    //   catchError((err)=> {return err})
    // )
    return this.http.request('POST', 'https://localhost:7105/api/Login/Login', { body: params, responseType: 'json', });
  }
}
