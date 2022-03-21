import { Component, OnInit, Output, Input } from '@angular/core';
import { bottom } from '@popperjs/core';
import { CommonService } from '../data/Service/common.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {
  @Input() titlePage: string = ''
  constructor(private commomSv: CommonService) { }

  ngOnInit(): void {
  }
  Logout() {
    const ok = confirm("Bạn có muốn đăng xuất không?");
    if (ok) {
      localStorage.removeItem('isLogged');
      localStorage.removeItem('user');
      this.commomSv.redirectToLogin();
    }
  }
}
