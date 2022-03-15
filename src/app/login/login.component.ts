import { Component, OnInit } from '@angular/core';
import { LoginInterface } from '../data/models/Login-interface';
import { LoginServiceService } from '../data/Service/Login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private sv : LoginServiceService) { }
  notification:string = ''
  userName: string =''
  password: string=''
  loginModel = {
    "userName" : this.userName , "password" :this.password
  }
  ngOnInit(): void {
  }
  
  login(formLogin:any){
    //this.sv.getData(formLogin)
  }
}
