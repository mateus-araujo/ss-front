import { Busca } from './../models/busca.model';
import { User } from './../models/user.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BuscaService {

  constructor(private http: Http) { }

  getPrestadores(busca: Busca): Promise<Array<User>> {
    return this.http.post('http://sobralservicos.com.br/busca', busca)
      .toPromise()
      .then(response => response.json());
  }

  getBuscas(): Promise<Array<Busca>> {
    return this.http.get('http://sobralservicos.com.br/buscas')
      .toPromise()
      .then(response => response.json());
  }

}
