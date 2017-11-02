import { User } from './../models/user.model';
import { PessoaJuridica } from './../models/pessoa-juridica.model';
import { PessoaFisica } from './../models/pessoa-fisica.model';
import { Prestador } from './../models/prestador.model';
import { Usuario } from './../models/usuario.model';
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


}
