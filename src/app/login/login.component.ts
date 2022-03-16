import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInterface } from '../data/models/Login-interface';
import { LoginServiceService } from '../data/Service/Login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private sv : LoginServiceService, private router : Router) { }
  notification:string = ''
  userName: string =''
  password: string=''
  
  loginModel : LoginInterface = {
    "userName" : "" , "password" :""
  }
  ngOnInit(): void {
  }
  login(formLogin:any){
    this.loginModel.userName = formLogin.value.userName
    this.loginModel.password = formLogin.value.password
    this.sv.getData(this.loginModel).subscribe(res => {
      if(res)
       this.router.navigateByUrl('/search')
       else{
        alert("false")
       }
      })
  }
}
