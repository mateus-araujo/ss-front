import { CategoriaServico } from './../models/categoria-servico.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {

  constructor(private http: Http) { }

  getCategorias(): Promise<Array<CategoriaServico>> {
    return this.http.get('http://sobralservicos.com.br/categorias')
      .toPromise().then(response => response.json());
  }

  createCategoria(categoria: CategoriaServico) {
    return this.http.post('http://sobralservicos.com.br/categorias', categoria)
      .toPromise();
  }

}
