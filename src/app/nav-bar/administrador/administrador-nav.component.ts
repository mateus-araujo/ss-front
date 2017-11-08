import { GlobalService } from './../../compartilhado/services/global.service';
import { Router } from '@angular/router';
import { BuscaService } from './../../compartilhado/services/busca.service';
import { User } from './../../compartilhado/models/user.model';
import { Busca } from './../../compartilhado/models/busca.model';
import { Http } from '@angular/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-administrador',
  templateUrl: './administrador-nav.component.html',
  styleUrls: ['./administrador-nav.component.css',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AdministradorNavComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private buscaService: BuscaService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router) {

    this.globalService.updateUsuario(3);
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

      this.router.navigate(['/home/admin/busca']);
    });
  }

  sair() {
    this.router.navigate(['/home/user']);
  }
}
