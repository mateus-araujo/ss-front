import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DropdownService {

  constructor(private http: Http) { }

  getEstadosBr() {
    return this.http.get('assets/data/estadosbr.json')
      .map((res: Response) => res.json());
  }

  getCidadesBr() {
    return this.http.get('assets/data/cidadesbr.json')
      .map((res: Response) => res.json());
  }

  getCategorias() {
    return this.http.get('assets/data/categorias.json')
      .map((res: Response) => res.json());
  }

  getServicos() {
    return this.http.get('assets/data/servicos.json')
      .map((res: Response) => res.json());
  }

}
