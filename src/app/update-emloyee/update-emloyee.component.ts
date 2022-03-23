import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ParamUpdateEmployeeDto, ResponseUpdateEmployee } from '../data/models/request-update-class';
import { CommonService } from '../data/Service/common.service';
import { UpdateEmployeeServiceService } from '../data/Service/updateEmployee-service.service';

@Component({
  selector: 'app-update-emloyee',
  templateUrl: './update-emloyee.component.html',
  styleUrls: ['./update-emloyee.component.scss'],
  providers:[DatePipe]
})
export class UpdateEmloyeeComponent implements OnInit {
  titlePage = 'Sửa chữa thông tin nhân viên'
  constructor(
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private sv: UpdateEmployeeServiceService,
    private router: Router,
    private commonSv: CommonService,
    public datepipe: DatePipe
    ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  birthday?: Date
  isBirthDay:boolean = true
  password: string = ''
  rePassword: string = ''
  notification = ''
  passNote = ''
  birthdayNote = ''
  trueAdd = 'Sửa thành công'
  falseAdd = 'Sửa thất bại'
  modalConfirm = true
  closeResult: string;
  paramUpdateEmployeeDto: ParamUpdateEmployeeDto =
    {
      id: 0,
      name: '',
      birthDay: undefined,
      sex: 'male',
      phoneNumber: '',
      email: '',
      repairerId: 0,
      updateAt: undefined,
    }
  responseUpdateEmployee: ResponseUpdateEmployee

  ngOnInit(): void {
    if (!this.commonSv.isLogged) {
      this.commonSv.redirectToLogin();
    }
    if (this.commonSv.Id != null) {
      this.paramUpdateEmployeeDto.repairerId = this.commonSv.Id;
    }
    this.route.params
    .subscribe((search)  => this.paramUpdateEmployeeDto.id = search.id);
    this.sv.getUserById(this.paramUpdateEmployeeDto.id).subscribe(res => {
      this.paramUpdateEmployeeDto.id = res.id;
      this.paramUpdateEmployeeDto.name = res.name;
      this.paramUpdateEmployeeDto.sex = res.sex;
      this.paramUpdateEmployeeDto.birthDay = new Date(res.birthDay as any);
      this.paramUpdateEmployeeDto.email = res.email;
      this.paramUpdateEmployeeDto.phoneNumber = res.phoneNumber;
    });
  }
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }
  validateDate(date:any) {
    let now = new Date
    this.birthdayNote = ''
    //let birthday = new Date(this.birthday)
    //Fixme: nhập ngày ab/cd/nmkl
    if (!date.value) {
      this.birthdayNote = 'Không đúng định dạng';
      this.isBirthDay = false
    }
    else {
      this.paramUpdateEmployeeDto.birthDay = new Date(date.value)
      if (this.paramUpdateEmployeeDto.birthDay >= now) {
        this.birthdayNote = 'Không thể nhập ngày lớn hơn ngày hiện tại';
        this.isBirthDay = false
      }
      else {
        var diff = Math.abs(now.getTime() - this.paramUpdateEmployeeDto.birthDay.getTime());
        diff = (diff / (1000 * 60 * 60 * 24 * 365))
        if (diff < 18) {
          this.birthdayNote = 'Chưa đủ 18 tuổi';
          this.isBirthDay = false
        }
      }
    }
  }

  redirectToMain() {
    this.router.navigateByUrl('/search');
  }
  update(formUpdate: any, content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${this.updateEmployee(content)}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    formUpdate = '';
    this.modalConfirm = true;
  }
  addStatus: boolean;
  updateEmployee(content?: any) {
    this.sv.update(this.paramUpdateEmployeeDto).subscribe(res => {
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
}
