import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeInfomationInterface } from '../data/models/employeeInfomation-interface';
import { ResponseSearchInterface, ResponseSearchEmployee } from '../data/models/Response-search-interface';
import { SearchInterface, PageDto, ParamSearchEmployee } from '../data/models/search-interface';
import { SearchServiceService } from '../data/Service/search-service.service';
import { HeaderPageComponent } from '../header-page/header-page.component';
import { PopupConfirmComponentComponent } from '../popup-confirm-component/popup-confirm-component.component';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../data/Service/common.service';
import { PageServiceService } from '../data/Service/page-service.service';

@Component({
  selector: 'app-search-emloyee',
  templateUrl: './search-emloyee.component.html',
  styleUrls: ['./search-emloyee.component.scss']
})
export class SearchEmloyeeComponent implements OnInit {
  toBirthday: Date
  fromBirthday: Date
  closeResult: string;
  modalbody = 'Bạn có muốn xóa không?'
  trueSave = 'Xóa thành công'
  falseSave = 'Xóa thất bại'
  modalConfirm = true
  titlePage = 'Quản trị nhân viên'
  notification = ''
  content = false
  totalItem: number
  currentPage: number
  startPage: number

  endPage: number
  startIndex: number
  endIndex: number
  arrEmployee: ResponseSearchEmployee[]
  //  =[
  //   {Id:1 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  //   {Id:2 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  //   {Id:3 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  //   {Id:4 , "Name":"Dao Van Truong", "BirthDay":"23","Sex":"male","PhoneNumber":"0961907516","Email":"daotruong1907@gmail.com"},
  // ]

  columns: { title: string, field: string, isButtonColumn?: boolean }[] = [

  ];
  // đi kèm column
  //<th scope="col" *ngFor="let col of columns">{{col.title}}</th>
  responseSearch: ResponseSearchInterface

  searchInterface: SearchInterface = {
    PageDto: {
      ItemQuantityInPage: 10,
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
  constructor(
    private sv: SearchServiceService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private commonSv: CommonService,
    private page: PageServiceService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    if (!this.commonSv.isLogged) {
      this.commonSv.redirectToLogin();
    }

  }
  search(formSearch: any) {
    let emps: ResponseSearchEmployee[] = []
    this.sv.search(this.searchInterface).subscribe(res => {
      res.responseSearchEmployees.forEach(item => {
        emps.push({ id: item.id, birthDay: item.birthDay, sex: item.sex, phoneNumber: item.phoneNumber, email: item.email, name: item.name })
      });
      this.notification = res.responseFromServer
      // this.arrEmployee = res.responseSearchEmployees;
      // console.log(this.arrEmployee)
      this.arrEmployee = emps;
    })
  }
  open(content: any, id: number) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${this.deleteEmployee(id, content)}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deletedStatus: boolean;
  deleteEmployee(id: number, content?: any) {
    this.sv.delete(id).subscribe(res => {
      this.deletedStatus = res;
      this.modalConfirm = false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-comfirm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
    this.arrEmployee = this.arrEmployee.filter(x => x.id != id)
  }
  // this.modalConfirm = true;
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  validateDate(formSearch: any, callAPI?: boolean) {
    // if(!this.searchInterface.ParamSearchEmployee.FromBirthDay){
    //   // Thông báo không đc để trống
    // }
    //fixme: check date nhap ab/cd/efss
    this.searchInterface.ParamSearchEmployee.FromBirthDay = new Date(this.fromBirthday);
    this.searchInterface.ParamSearchEmployee.ToBirthDay = new Date(this.toBirthday);
    let ok = true;
    let now = new Date
    let listResponse = []
    if (this.searchInterface.ParamSearchEmployee.FromBirthDay && this.searchInterface.ParamSearchEmployee.ToBirthDay) {
      if (this.searchInterface.ParamSearchEmployee.FromBirthDay > this.searchInterface.ParamSearchEmployee.ToBirthDay) {
        listResponse.push('Từ ngày không thể lớn hơn đến ngày')
        ok = false;
      }
      if (this.searchInterface.ParamSearchEmployee.FromBirthDay >= now || this.searchInterface.ParamSearchEmployee.ToBirthDay >= now) {
        listResponse.push('Không thể nhập ngày lớn hơn ngày hiện tại')
        ok = false;
      }
    }
    else {
      if (this.searchInterface.ParamSearchEmployee.FromBirthDay && this.searchInterface.ParamSearchEmployee.FromBirthDay >= now) {
        listResponse.push('Từ ngày không thể lớn hơn ngày hiện tại')
        ok = false;
      }
      if (this.searchInterface.ParamSearchEmployee.ToBirthDay && this.searchInterface.ParamSearchEmployee.ToBirthDay >= now) {
        listResponse.push('Đến ngày không thể lớn hơn ngày hiện tại')
        ok = false;
      }
    }
    this.notification = listResponse.join(',')
    if (ok && callAPI) {
      // Gọi api tìm kiếm
      this.search(formSearch)
    }
  }

  pagination(pageSize: number, totalPage: number, currentPage: number) {
    this.page.getTotalItem().subscribe(res => { this.totalItem = res })
    this.searchInterface.PageDto.ItemQuantityInPage = 10
    this.searchInterface.PageDto.PageQuantity = Math.ceil(this.totalItem / this.searchInterface.PageDto.ItemQuantityInPage)
    this.sv.search(this.searchInterface)

  }

  getTotalItem(){
    this.sv.search(this.searchInterface)
  }

  getPage(pageSize: number, totalItem: number, currentPage: number) {
    currentPage = currentPage || 1
    pageSize = pageSize || 10
    let totalPage = Math.ceil(totalItem / pageSize)
    let firstPage = 1
    let lastPage = Math.ceil(totalItem / pageSize)
    var startPage, endPage
    this.startIndex = (currentPage - 1) * pageSize
    this.endIndex = Math.min((this.startIndex + pageSize - 1), (totalItem - 1))
    if (totalPage <= 3) {
      startPage = 1
      endPage = totalPage
    }
    else
      if (currentPage <= 2) {
        startPage = 1
        endPage = totalPage
      }
      else if (currentPage + 2 > totalPage) {
        startPage = totalPage - 2
        endPage = totalPage
      }
      else {
        startPage = currentPage - 1
        endPage = currentPage + 1
      }
    var page = [startPage, endPage + 1]
    return {
      totalItems: totalItem,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPage,
      startPage: startPage,
      endPage: endPage,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      page: this.page
    };
  }
}
