import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeInfomationInterface } from '../data/models/employeeInfomation-interface';
import { ResponseSearchInterface, ResponseSearchEmployee } from '../data/models/Response-search-interface';
import { SearchInterface, PageDto, ParamSearchEmployee } from '../data/models/search-interface';
import { SearchServiceService } from '../data/Service/search-service.service';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { PopupConfirmComponentComponent } from '../popup-confirm-component/popup-confirm-component.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-emloyee',
  templateUrl: './search-emloyee.component.html',
  styleUrls: ['./search-emloyee.component.scss']
})
export class SearchEmloyeeComponent implements OnInit {
  // @ViewChild(PopupConfirmComponentComponent) myModal;

  // openModel() {
  // this.myModal.nativeElement.className = 'modal fade show';
  // }
  // closeModel() {
  //  this.myModal.nativeElement.className = 'modal hide';
  // }
  titlePage = 'Quản trị nhân viên'
  notification = ''
  content = false
  arrEmployee: ResponseSearchEmployee[]
  //  =[
  //   {Id:1 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  //   {Id:2 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  //   {Id:3 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  //   {Id:4 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  // ]
  responseSearch: ResponseSearchInterface

  searchInterface: SearchInterface = {
    PageDto: {
      ItemQuantityInPage: 5,
      PageQuantity: 1
    },
    ParamSearchEmployee: {
      FromBirthDay: undefined,
      NameOrEmail: '',
      PhoneNumber: '',
      Sex: 'ALL',
      ToBirthDay: undefined
    }
  };
  constructor(private sv: SearchServiceService ,config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
  ngOnInit(): void {

  }
  search(formSearch: any) {
    let emps: ResponseSearchEmployee[]= []
    this.sv.search(this.searchInterface).subscribe(res => {
      res.responseSearchEmployees.forEach(item => { 
        emps.push({ id :item.id , birthDay:item.birthDay,sex:item.sex , phoneNumber : item.phoneNumber, email : item.email ,name : item.name})
    });
    this.notification = res.responseFromServer
      // this.arrEmployee = res.responseSearchEmployees;
      // console.log(this.arrEmployee)
      this.arrEmployee = emps;
    } )
  }
  deleteEmployee(id:number){
    // for(let idx =0; idx < this.arrEmployee.length; idx++) {
    //   if(this.arrEmployee[idx].id == id)
    //   {
       //   this.sv.delete(this.arrEmployee[idx].id)
     // }  
     this.sv.delete(id);
     this.arrEmployee = this.arrEmployee.filter(x=> x.id != id)
  }
  open(content:any) {
    this.modalService.open(content);
  }
}
