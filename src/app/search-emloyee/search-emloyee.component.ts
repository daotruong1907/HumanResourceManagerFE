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
import { FormControl, NgForm } from '@angular/forms';

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
  trueSearch = true
  eraserId?: number
  content = false
  arrEmployee: ResponseSearchEmployee[] = [];
  p: number = 1;
  count: number = 5;

  @ViewChild('formSearch') form: NgForm;

  columns: { title: string, field: string, isButtonColumn?: boolean }[] = [
    { title: 'STT', field: '{{i+1}}', isButtonColumn: false },
    { title: 'Họ Tên', field: '{{i+1}}', isButtonColumn: false },
    { title: 'Ngày sinh', field: '{{i+1}}', isButtonColumn: false },
    { title: 'Giới tính', field: '{{i+1}}', isButtonColumn: false },
    { title: 'Điện thoại', field: '{{i+1}}', isButtonColumn: false },
    { title: 'Email', field: '{{i+1}}', isButtonColumn: false },
    { title: 'Sửa', field: '{{i+1}}', isButtonColumn: true },
    { title: 'Xóa', field: '{{i+1}}', isButtonColumn: true },
  ];
  // đi kèm column
  //<th scope="col" *ngFor="let col of columns">{{col.title}}</th>
  responseSearch: ResponseSearchInterface

  searchInterface: SearchInterface = {
    PageDto: {
      ItemQuantityInPage: 50,
      PageQuantity: 1
    },
    ParamSearchEmployee: {
      FromBirthDay: undefined,
      NameOrEmail: '',
      PhoneNumber: '',
      Sex: 3,
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
    if (this.commonSv.Id != null) {
      this.eraserId = this.commonSv.Id;
    }
    if (localStorage.getItem('Id') != null) {
      this.eraserId = Number.parseInt(localStorage.getItem('Id') || "0") || undefined;
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
      if (emps.length == 0)
        this.notification = 'Không có nhân viên nào thỏa mãn'
      this.trueSearch = true
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
    this.sv.delete(id, this.eraserId).subscribe(res => {
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
  isBirthDay = true

  validateDate(formSearch: NgForm, callAPI?: boolean, event?: Event) {
    let ok = true;
    let listResponse = []
    if (event) {
      if (event.target) {
        listResponse.push((event.target as HTMLInputElement).validationMessage);
        ok = !this.notification;
      }
    }

    if (ok) {
  //      = new Date(toDate);
      const fromDateValue = formSearch.controls['fromBirthday']?.value;
      const toDateValue = formSearch.controls['toBirthday']?.value;
      let now = new Date
      if (fromDateValue)
      {
        this.searchInterface.ParamSearchEmployee.FromBirthDay = new Date(fromDateValue)
        if (this.searchInterface.ParamSearchEmployee.FromBirthDay > now) {
          listResponse.push('Từ ngày không thể lớn hơn ngày hiện tại')
          ok = false;
        }
      }
      // if (!fromDateValue && formSearch.controls['fromBirthday']?.touched ){
      //   listResponse.push('Từ ngày không đúng định dạng ngày')
      //   ok = false;
      // }
      if (toDateValue)
      {
        this.searchInterface.ParamSearchEmployee.ToBirthDay = new Date(toDateValue)
        if (this.searchInterface.ParamSearchEmployee.ToBirthDay > now) {
          listResponse.push('Đến ngày không thể nhập ngày lớn hơn ngày hiện tại')
          ok = false;
        }
      }
      if (toDateValue && fromDateValue)
      {
        this.searchInterface.ParamSearchEmployee.FromBirthDay = new Date(fromDateValue)
        this.searchInterface.ParamSearchEmployee.ToBirthDay = new Date(toDateValue)
        if ( this.searchInterface.ParamSearchEmployee.FromBirthDay > this.searchInterface.ParamSearchEmployee.ToBirthDay) {
          listResponse.push('Từ ngày không thể lớn hơn đến ngày')
          ok = false;
        }
      }
    }
    if (callAPI) {
      // Gọi api tìm kiếm
      this.search(formSearch)
    }
    this.notification = listResponse.join(',')
  }
  onChangeForm(){
    this.notification='';
  }

  //fixme: check date nhap ab/cd/efss
  // let listResponse = []
  // let ok = true;
  // const fromDateValue = this.form.controls['fromBirthday']?.value;
  // const endDateValue = this.form.controls['toBirthday']?.value;
  // let now = new Date
  // if (fromDate || toDate) {
  //   if (fromDate) {
  //     if (!fromDate.value) {
  //       listResponse.push('Từ ngày không đúng định dạng ngày')
  //       this.isBirthDay = false
  //       ok = false
  //       this.trueSearch = false
  //     }
  //     fromDate = new Date(fromDate.value)
  //     if (fromDate.value > now) {
  //       listResponse.push('Không thể nhập ngày lớn hơn ngày hiện tại')
  //       this.isBirthDay = false
  //       ok = false
  //       this.trueSearch = false
  //     }
  //   }

  //   if (toDate) {
  //     if (!toDate.value && toDate.touched) {
  //       listResponse.push('Đến ngày không đúng định dạng ngày')
  //       this.isBirthDay = false
  //       ok = false
  //       this.trueSearch = false
  //     }
  //     toDate = new Date(toDate.value)
  //     if (toDate.value > now) {
  //       listResponse.push('Không thể nhập ngày lớn hơn ngày hiện tại')
  //       this.isBirthDay = false
  //       ok = false
  //       this.trueSearch = false
  //     }
  //   }

  //   if (toDate && fromDate) {
  //     this.searchInterface.ParamSearchEmployee.FromBirthDay = new Date(fromDate);
  //     this.searchInterface.ParamSearchEmployee.ToBirthDay = new Date(toDate);
  //     if (this.searchInterface.ParamSearchEmployee.FromBirthDay > this.searchInterface.ParamSearchEmployee.ToBirthDay) {
  //       listResponse.push('Từ ngày không thể lớn hơn đến ngày')
  //       ok = false;
  //       this.trueSearch = false
  //     }
  //     if (this.searchInterface.ParamSearchEmployee.FromBirthDay >= now || this.searchInterface.ParamSearchEmployee.ToBirthDay >= now) {
  //       listResponse.push('Không thể nhập ngày lớn hơn ngày hiện tại')
  //       ok = false;
  //       this.trueSearch = false
  //     }
  //   }
  //   if (callAPI) {
  //     // Gọi api tìm kiếm
  //     this.search(formSearch)
  //   }
  //   this.notification = listResponse.join(',')
  // }
  // else {
  //   this.notification = '';
  // }
}
