import { GlobalService } from './../../compartilhado/services/global.service';
import { Router } from '@angular/router';
import { User } from './../../compartilhado/models/user.model';
import { BuscaService } from './../../compartilhado/services/busca.service';
import { Busca } from './../../compartilhado/models/busca.model';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-prestador',
  templateUrl: './prestador-nav.component.html',
  styleUrls: ['./prestador-nav.component.css',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class PrestadorNavComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private buscaService: BuscaService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router) {

    this.globalService.updateUsuario(2);
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      campoBusca: [null]
    });

  }

  buscar() {
    const busca = new Busca;
    busca.valor = this.formulario.get('campoBusca').value;

    this.buscaService.getPrestadores(
      busca
    ).then((dados: Array<User>) => {
      this.globalService.updatePrestadores(dados);

      this.router.navigate(['/home/prestador/busca']);
    });
  }

  sair() {
    this.router.navigate(['/home/user']);
  }
}
