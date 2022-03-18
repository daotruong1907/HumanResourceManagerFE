import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-emloyee',
  templateUrl: './update-emloyee.component.html',
  styleUrls: ['./update-emloyee.component.scss']
})
export class UpdateEmloyeeComponent implements OnInit {
  titlePage='Sửa chữa thông tin nhân viên'
  constructor() { }

  ngOnInit(): void {
  }
  update(formUpdate:any){
      
  }
}
