import { Component } from '@angular/core';
import { ProductoService } from 'src/app/Services/producto.service';
import { UserModel } from '../login/usermodel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userList : UserModel[] = [];
  userSelected : UserModel = new UserModel();

  constructor(
    private services:ProductoService
  ) {

    this.GetUserList();
   }

   GetUserList()
  {
    this.services.GetUserList()
      .subscribe(
        data => {
            this.userList = data;
            
        },
        error =>{

        }
      );
  }

  UspertUser()
  {
    this.services.UspertUser(this.userSelected)
      .subscribe(
        data => {
            this.userSelected = new UserModel();
            this.userList = data;
            
        },
        error =>{

        }
      );
  }

  Limpiar()
  {
    this.userSelected = new UserModel();
  }

  selectUser(user : UserModel)
  {
    this.userSelected = user;
  }
}
