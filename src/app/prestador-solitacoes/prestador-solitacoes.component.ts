import { User } from './../compartilhado/models/user.model';
import { ServicoPrestadoService } from './../compartilhado/services/servico-prestado.service';
import { UsuarioService } from './../compartilhado/services/usuario.service';
import { ServicoPrestado } from './../compartilhado/models/servico-prestado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prestador-solitacoes',
  templateUrl: './prestador-solitacoes.component.html',
  styleUrls: ['./prestador-solitacoes.component.css']
})
export class PrestadorSolitacoesComponent implements OnInit {

  solicitacoes: Array<ServicoPrestado>;

  constructor(
    private usuarioService: UsuarioService,
    private servicoPrestadoService: ServicoPrestadoService) { }

  ngOnInit() {
    this.usuarioService.checkLogin().then(
      (user: User) => {
        this.usuarioService.getPrestador(user.id).then(
          (usuario: User) => {
            this.servicoPrestadoService.getSolicitacoes(usuario[0].prestador_id).then(
              (dados: Array<ServicoPrestado>) => {
                this.solicitacoes = dados;
                console.log(this.solicitacoes);

                for (let i = 0; i < dados.length; i++) {
                  console.log(dados[i].id_solicitante);
                  this.usuarioService.getUser(dados[i].id_solicitante).then(
                    (dado: User) => this.solicitacoes[i].solicitante = dado.name
                  );

                }
              }
            );
          }
        );
      }
    );
  }

}
