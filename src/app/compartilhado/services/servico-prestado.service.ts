import { ServicoPrestado } from './../models/servico-prestado';
import { Servico } from './../models/servico.model';
import { CategoriaServico } from './../models/categoria-servico.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServicoPrestadoService {

  constructor(private http: Http) { }

  createServicoPrestado(servicoPrestado: ServicoPrestado) {
    console.log(servicoPrestado);
    return this.http.post('http://sobralservicos.com.br/servico_prestado', servicoPrestado)
      .toPromise();
  }

  getSolicitacoes(id): Promise<Array<ServicoPrestado>> {
    return this.http.get(`http://sobralservicos.com.br/solicitacoes_servicos/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  updateCategoria(id: number, categoria: CategoriaServico) {
    return this.http.post(`http://sobralservicos.com.br/categoria/${id}/`, categoria)
      .toPromise();
  }


  deleteCategoria(id: number) {
    return this.http.delete(`http://sobralservicos.com.br/categoria/${id}`)
      .toPromise();
  }
}

