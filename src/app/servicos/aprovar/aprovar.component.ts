import { Message, ConfirmationService } from 'primeng/primeng';
import { User } from './../../compartilhado/models/user.model';
import { UsuarioService } from './../../compartilhado/services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aprovar',
  templateUrl: './aprovar.component.html',
  styleUrls: ['./aprovar.component.css']
})
export class AprovarComponent implements OnInit {

  prestadores: Array<User>;
  msgs: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private usuarioService: UsuarioService
  ) {

    this.usuarioService
      .getPrestadores()
      .then((dados: Array<User>) =>
        this.prestadores = dados
      );
  }

  ngOnInit() {
  }


  aprovar() {
    this.confirmationService.confirm({
      header: 'Aprovar',
      message: 'Deseja deseja aprovar este profissional?',
      accept: () => {
        window.location.reload();

        this.msgs = [{
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Profissional aprovado'
        }];
      },
      reject: () => {
        window.location.reload();

        this.msgs = [{
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Profissional não foi aprovado'
        }];
      }
    });
  }

  recusar() {
    this.confirmationService.confirm({
      header: 'Recusar',
      message: 'Deseja deseja recusar este profissional?',
      accept: () => {
        window.location.reload();

        this.msgs = [{
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Profissional recusado'
        }];
      },
      reject: () => {
        window.location.reload();

        this.msgs = [{
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Profissional não foi recusado'
        }];
      }
    });
  }
}
