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

}
