import { UsuarioService } from './../../compartilhado/services/usuario.service';
import { GlobalService } from './../../compartilhado/services/global.service';
import { Router } from '@angular/router';
import { AppComponent } from './../../app.component';
import { Busca } from './../../compartilhado/models/busca.model';
import { User } from './../../compartilhado/models/user.model';
import { BuscaService } from './../../compartilhado/services/busca.service';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-usuario',
  templateUrl: './usuario-nav.component.html',
  styleUrls: ['./usuario-nav.component.css',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class UsuarioNavComponent implements OnInit {

  formulario: FormGroup;
  check_login: boolean;

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private buscaService: BuscaService,
    private usuarioService: UsuarioService,
    private http: Http,
    private router: Router) {

    this.globalService.updateUsuario(1);

    this.globalService.checkLogin.subscribe(
      (login: boolean) => this.check_login = login
    );
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

      this.router.navigate(['/home/user/busca']);
    });
  }

  sair() {
    this.globalService.updateLogin(false);
    window.location.reload();
  }

  login() {
    this.router.navigate(['/home/user/login']);
  }
}
