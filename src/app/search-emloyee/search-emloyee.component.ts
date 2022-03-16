import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderPageComponent } from '../header-page/header-page.component';
@Component({
  selector: 'app-search-emloyee',
  templateUrl: './search-emloyee.component.html',
  styleUrls: ['./search-emloyee.component.scss']
})
export class SearchEmloyeeComponent implements OnInit {
  titlePage='Quản trị nhân viên'
  constructor() { }
  ngOnInit(): void {
    
  }
  search(formSearch:any){
      console.log(formSearch)
  }
}
