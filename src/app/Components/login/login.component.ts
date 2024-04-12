import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/Services/producto.service';
import { UserModel } from './usermodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: boolean = false;

  UserSelected: UserModel = new UserModel();
  constructor(
    private services: ProductoService,
    private router: Router,
  ) {

    this.services.setRol(0);
  }

  //Validation for allow action
  ValidationsForm() {
    if (this.UserSelected.user == null ||
      this.UserSelected.user == "" ||
      this.UserSelected.password == "" ||
      this.UserSelected.password == null) {
      return false;
    }
    else {
      return true;
    }

  }

  Login() {
    if (this.ValidationsForm()) {
      this.services.GetUserAuth(this.UserSelected)
        .subscribe(
          data => {
            localStorage.setItem('login', "true")
            this.services.setRol(data.rol);
            this.router.navigate(["productos"]);
          },
          error => {
            this.message = true;
            localStorage.setItem('login', "false")
          }
        );
    }

  }
}