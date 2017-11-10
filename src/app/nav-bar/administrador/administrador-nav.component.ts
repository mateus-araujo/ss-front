import { UsuarioService } from './../../compartilhado/services/usuario.service';
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
  check_login: boolean;
  tipo_usuario: number;

  constructor(
    private buscaService: BuscaService,
    private globalService: GlobalService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router) {


  }

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

          if (this.tipo_usuario !== 3) {
            if (this.tipo_usuario === 2) {
              this.router.navigate(['/home/prestador']);
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

      this.router.navigate(['/home/admin/busca']);
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
}
