import { Servico } from './../models/servico.model';
import { CategoriaServico } from './../models/categoria-servico.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaServicoService {

  constructor(private http: Http) { }

  getCategoria(id: number): Promise<CategoriaServico> {
    return this.http.get(`http://sobralservicos.com.br/categoria/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  getServico(id: number): Promise<Servico> {
    return this.http.get(`http://sobralservicos.com.br/servico/${id}`)
      .toPromise()
      .then(response => response.json());
  }

  getCategorias(): Promise<Array<CategoriaServico>> {
    return this.http.get('http://sobralservicos.com.br/categorias')
      .toPromise().then(response => response.json());
  }

  getServicos(id: number): Promise<Array<Servico>> {
    return this.http.get(`http://sobralservicos.com.br/categoria/${id}/servicos`)
      .toPromise()
      .then(response => response.json());
  }

  getAllServicos(): Promise<Array<Servico>> {
    return this.http.get(`http://sobralservicos.com.br/servicos`)
      .toPromise()
      .then(response => response.json());
  }

  createCategoria(categoria: CategoriaServico) {
    return this.http.post('http://sobralservicos.com.br/categorias', categoria)
      .toPromise();
  }

  createServico(servico: Servico) {
    return this.http.post('http://sobralservicos.com.br/servicos', servico)
      .toPromise();
  }

  updateCategoria(id: number, categoria: CategoriaServico) {
    return this.http.post(`http://sobralservicos.com.br/categoria/${id}/`, categoria)
      .toPromise();
  }

  updateServico(id: number, servico: Servico) {
    return this.http.post(`http://sobralservicos.com.br/servico/${id}`, servico)
      .toPromise();
  }

  deleteCategoria(id: number) {
    return this.http.delete(`http://sobralservicos.com.br/categoria/${id}`)
      .toPromise();
  }

  deleteServico(id: number) {
    return this.http.delete(`http://sobralservicos.com.br/servico/${id}`)
      .toPromise();
  }

}
