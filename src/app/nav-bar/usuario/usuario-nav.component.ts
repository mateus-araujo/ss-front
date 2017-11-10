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
  tipo_usuario: number;

  constructor(
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private buscaService: BuscaService,
    private usuarioService: UsuarioService,
    private http: Http,
    private router: Router) { }

  ngOnInit() {
    try {
      this.usuarioService.checkLogin().then(
        (usuario: User) => {
          this.globalService.updateLogin(true);
          this.globalService.updateUsuario(usuario.tipo_usuario);
          this.check_login = true;
          this.tipo_usuario = usuario.tipo_usuario;

          console.log(this.check_login);
          console.log(this.tipo_usuario);

          if (this.tipo_usuario !== 1) {
            if (this.tipo_usuario === 2) {
              this.router.navigate(['/home/prestador']);
            } else {
              this.router.navigate(['/home/admin']);
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

      this.router.navigate(['/home/user/busca']);
    });
  }

  home() {
    window.location.reload();
  }

  sair() {
    this.usuarioService.logout();
    this.globalService.updateLogin(false);
    this.router.navigate(['/home/user']);
    window.location.reload();
  }

  login() {
    this.router.navigate(['/home/user/login']);
  }
}
