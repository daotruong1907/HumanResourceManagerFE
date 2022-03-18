import { Component } from '@angular/core';
import { CommonService } from './data/Service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HRMWebFontEnd';
  // isLogin = true
  // isSearch = false
  // isAdd = false
  // isUpdate = false

  constructor(private commonSv: CommonService) {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged == 'true') {
      this.commonSv.isLogged = true;
    }
  }
}
