import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { RequestAddClass } from '../data/models/Request-add-class';
import { ResponseAddClass } from '../data/models/response-add-class';
import { AddEmployeeServiceService } from '../data/Service/addEmployee-service.service';
import { CommonService } from '../data/Service/common.service';

@Component({
  selector: 'app-add-emloyee',
  templateUrl: './add-emloyee.component.html',
  styleUrls: ['./add-emloyee.component.scss']
})
export class AddEmloyeeComponent implements OnInit {
  titlePage = 'Thêm mới nhân viên'
  constructor(config: NgbModalConfig, private modalService: NgbModal, private sv: AddEmployeeServiceService, private router: Router, private commonSv: CommonService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  birthday: Date
  password: string = ''
  rePassword: string = ''
  notification = ''
  passNote = ''
  birthdayNote= ''
  trueAdd = 'Thêm thành công'
  falseAdd = 'Thêm thất bại'
  modalConfirm = true
  closeResult: string;
  requestAddClass: RequestAddClass =
    {
      name: '',
      birthDay: undefined,
      sex: 'male',
      phoneNumber: '',
      email: '',
      password: '',
      creator: '',
      createAt: new Date,
      repairer: '',
      updateAt: new Date,
    }
  responseAddClass: ResponseAddClass

  ngOnInit(): void {
    if(!this.commonSv.isLogged)
    {
      this.commonSv.redirectToLogin();
    }
    if(this.commonSv.user != null){
      this.requestAddClass.creator = this.commonSv.user;
    }
  }
  validatePass(){
    if(this.password && this.rePassword )
    {
      this.passNote = "The entered passwords do not match. Try again."
    }
    else{
      this.passNote = "Password is required."
    }
  }
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }
  // validateEmail(){
  //   if(this.requestAddClass.email != null)
  //   {
  //     this.passNote = this.requestAddClass.email.setValidators(this.requestAddClass.email)
  //   }
  // }
  validateDate() {
    let now = new Date
    this.birthdayNote =''
    //let birthday = new Date(this.birthday)
    //Fixme: nhập ngày ab/cd/nmkl
    if(!this.birthday)
    {
      this.birthdayNote = 'Birthday is valid' ;
    }
    else{
      this.requestAddClass.birthDay = new Date(this.birthday)
      if (this.requestAddClass.birthDay >= now) {
        this.birthdayNote = 'Không thể nhập ngày lớn hơn ngày hiện tại';
      }
      else {
        var diff = Math.abs(now.getTime() - this.requestAddClass.birthDay.getTime());
        diff = (diff / (1000 * 60 * 60 * 24 * 365))
        if (diff < 18) {
          this.birthdayNote = 'Chưa đủ 18 tuổi';
        }
      }
    }
  }
  add(formAdd: any, content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${this.addEmployee(content)}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
      formAdd = '';
      this.modalConfirm = true;
  }
  addStatus: boolean;
  addEmployee(content?: any) {
    this.sv.add(this.requestAddClass).subscribe(res => {
      res.isSuccess ? this.addStatus = true : this.addStatus = false
      this.modalConfirm = false;
      this.notification = res.responseFromServer;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
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
  redirectToMain() {
    this.router.navigateByUrl('/search');
  }
}
