import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login_admin(data:any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', JSON.stringify(data), { headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }
// Metodo 
  public isAuthenticated(allowRoles: string[]):boolean{
    const token = localStorage.getItem('token');
   // const helper = new JwtHelperService()
    //const decodedToken = helper.decodeToken(token);
    if (!token) {
      return false;
    }


    ///      POR CORREGIR LO QUE ESTA EN COMENTARIOS
    // if(!decodedToken){
    //   return false;
    // }
    return true;
  }
}
