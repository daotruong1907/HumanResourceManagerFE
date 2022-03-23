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
      if (res.isSuccess === true) {
        this.commonSv.isLogged = res.isSuccess;
        this.commonSv.Id = res.id;
        localStorage.setItem('isLogged', '' + res.isSuccess);
        localStorage.setItem('Id',''+res.id);
        this.router.navigateByUrl('/search')
      }
      else {
        this.notification = 'Tài khoản mật khẩu không chính xác';
      }
    })
  }
}
