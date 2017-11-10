import { User } from './../models/user.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  createUser(user: User) {
    return this.http.post('http://sobralservicos.com.br/user', user)
      .toPromise();
  }

  login(user: User): Promise<User> {
    return this.http.post('http://sobralservicos.com.br/login', user)
      .toPromise()
      .then(response => response.json());
  }

  logout() {
    return this.http.get('http://sobralservicos.com.br/logout')
      .toPromise();
  }

  checkLogin(): Promise<User> {
    return this.http.get('http://sobralservicos.com.br/check_login')
      .toPromise()
      .then(response => response.json());
  }

  getPrestadores(): Promise<Array<User>> {
    return this.http.get('http://sobralservicos.com.br/prestadores')
      .toPromise()
      .then(response => response.json());
  }

  getPrestador(id: number): Promise<User> {
    return this.http.get(`http://sobralservicos.com.br/prestador/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  getUser(id: number): Promise<User> {
    return this.http.get(`http://sobralservicos.com.br/user/${id}`)
      .toPromise()
      .then(response => response.json());
  }



}
