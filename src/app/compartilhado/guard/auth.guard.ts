import { User } from './../models/user.model';
import { UsuarioService } from './../services/usuario.service';
import { GlobalService } from './../services/global.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  user: User;
  checkLogin: boolean;

  constructor(
    private globalService: GlobalService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    this.usuarioService.checkLogin().then(
      (usuario: User) => {
        this.globalService.updateLogin(true);
        this.globalService.updateUsuario(usuario.tipo_usuario);

        this.globalService.checkLogin.subscribe(
          (login: boolean) => this.checkLogin = login);
      });

    if (this.checkLogin) {
      return true;
    }

    return false;
  }

}
