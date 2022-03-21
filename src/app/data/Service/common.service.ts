import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLogged: boolean;
  user: string;
  constructor(private router: Router) { }


  redirectToLogin() {
    this.router.navigateByUrl('/');
  }
}
