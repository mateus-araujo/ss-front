import { Prestador } from './../../compartilhado/models/prestador.model';
import { UsuarioService } from './../../compartilhado/services/usuario.service';
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
  perfil_id: number;
  check_login: boolean;
  tipo_usuario: number;

  constructor(
    private buscaService: BuscaService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private http: Http,
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
    try {
      this.usuarioService.checkLogin().then(
        (usuario: User) => {
          this.globalService.updateLogin(true);
          this.globalService.updateUsuario(usuario.tipo_usuario);
          this.check_login = true;
          this.tipo_usuario = usuario.tipo_usuario;
          this.perfil_id = usuario.id;

          console.log(this.check_login);
          console.log(this.tipo_usuario);

          if (this.tipo_usuario !== 2) {
            if (this.tipo_usuario === 3) {
              this.router.navigate(['/home/admin']);
            } else {
              this.router.navigate(['/home/user']);
            }
          }
        }
      );
    } catch (error) {
      //
    }

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

  home() {
    window.location.reload();
  }

  sair() {
    this.usuarioService.logout().then(() => {
      this.globalService.updateLogin(false);
      this.globalService.updateUsuario(1);
      this.router.navigate(['/home/user']);
      window.location.reload();
    });
  }

  abrirPerfil() {
    this.router.navigate(['/home/prestador/perfil', this.perfil_id]);
    window.location.reload();
  }
}
