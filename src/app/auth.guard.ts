import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    let login: boolean = false;
    if (localStorage.getItem('login') == 'true') {
      login = true
      console.log(login)
    }
    if (login) {
      return true;
    } else {
      this.router.navigate(['/productos']);
      return false;
    }
  }
}