import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


declare var jQuery: any;
declare var $: any;
declare var iziToast: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public token: string | null;
  public user: any= {};
  public usuario :any ={};

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
    // Aquí puedes inicializar otras propiedades o ejecutar lógica adicional si es necesario
  }

  

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/']);
    }else{
      // MANTENER EN EL COMPONENTE
    }
  }


  login(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log(this.user);
     
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        response=>{
         if(response.data === undefined){
          iziToast.show({
            title: 'Error',
            titleColor: '#ff0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: response.message
          });
         }else{
          this.usuario = response.data;
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.data._id);

          this._router.navigate(['/']);
         }
        },
        error=>{
          console.log(error);
        }
      );
      
      
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Datos del formulario inválidos'
      });
    }
  }
}
