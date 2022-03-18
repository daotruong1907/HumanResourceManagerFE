import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInterface } from '../data/models/Login-interface';
import { CommonService } from '../data/Service/common.service';
import { LoginServiceService } from '../data/Service/Login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private sv: LoginServiceService, private router: Router, private commonSv: CommonService) { }
  notification: string = ''
  userName: string = ''
  password: string = ''

  loginModel: LoginInterface = {
    "userName": "", "password": ""
  }
  ngOnInit(): void {
  }
  login(formLogin: any) {
    this.loginModel.userName = formLogin.value.userName
    this.loginModel.password = formLogin.value.password
    this.sv.getData(this.loginModel).subscribe(res => {
      if (res) {
        this.commonSv.isLogged = res;
        localStorage.setItem('isLogged', '' + res);
        this.router.navigateByUrl('/search')
      }
      else {
        alert("false")
      }
    })
  }
}
