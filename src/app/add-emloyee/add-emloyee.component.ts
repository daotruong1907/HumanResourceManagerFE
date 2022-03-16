import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-emloyee',
  templateUrl: './add-emloyee.component.html',
  styleUrls: ['./add-emloyee.component.scss']
})
export class AddEmloyeeComponent implements OnInit {
  titlePage='Thêm mới nhân viên'
  constructor() { }
  name:string=''
  birthday:any = Date.now();
  phoneNumber:string=''
  password:string =''
  rePassword:string=''
  ngOnInit(): void {
  }
  add(formAdd:any){}
}
