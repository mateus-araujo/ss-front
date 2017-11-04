import { Plano } from './../models/plano.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlanosService {

  constructor(private http: Http) { }

  getPlano(id: number): Promise<Plano> {
    return this.http.get(`http://sobralservicos.com.br/plano/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  getPlanos(): Promise<Array<Plano>> {
    return this.http.get('http://sobralservicos.com.br/planos')
      .toPromise()
      .then(response => response.json());
  }

  createPlano(plano: Plano) {
    return this.http.post('http://sobralservicos.com.br/plano', plano)
      .toPromise();
  }

  updatePlano(id: number, plano: Plano) {
    return this.http.post(`http://sobralservicos.com.br/plano/${id}/`, plano)
      .toPromise();
  }

  deletePlano(id: number) {
    return this.http.delete(`http://sobralservicos.com.br/plano/${id}`)
      .toPromise();
  }

}
