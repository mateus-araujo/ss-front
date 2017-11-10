import { UsuarioService } from './usuario.service';
import { User } from './../models/user.model';
import { CategoriaServico } from './../models/categoria-servico.model';
import { Plano } from './../models/plano.model';
import { Servico } from './../models/servico.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  private prestadores = new BehaviorSubject<Array<User>>([]);
  prestadoresBusca = this.prestadores.asObservable();

  private usuario = new BehaviorSubject<number>(1);
  usuarioTipo = this.usuario.asObservable();

  private prestador = new BehaviorSubject<any>('');
  prestadorPerfil = this.prestador.asObservable();

  private login = new BehaviorSubject<boolean>(false);
  checkLogin = this.login.asObservable();

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuarioService.checkLogin().then(
      (user: User) => {
        this.updateLogin(true);
        this.updateUsuario(user.tipo_usuario);
      });
  }

  updatePrestadores(array: Array<User>) {
    this.prestadores.next(array);
  }

  updateUsuario(user: number) {
    this.usuario.next(user);
  }

  updatePrestador(prestador: User) {
    this.prestador.next(prestador);
  }

  updateLogin(login: boolean) {
    this.login.next(login);
  }
}
