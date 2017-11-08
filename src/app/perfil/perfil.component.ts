import { CategoriaServicoService } from './../compartilhado/services/categoria-servico.service';
import { CategoriaServico } from './../compartilhado/models/categoria-servico.model';
import { Servico } from './../compartilhado/models/servico.model';
import { GlobalService } from './../compartilhado/services/global.service';
import { User } from './../compartilhado/models/user.model';
import { UsuarioService } from './../compartilhado/services/usuario.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id: number;
  subscription: Subscription;
  perfil: User;

  formulario: FormGroup;
  msgs: Message[] = [];
  contrato: boolean;

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private usuarioService: UsuarioService,
    private categoriaServicoService: CategoriaServicoService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.contrato = false;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        console.log(this.id);

        this.usuarioService.getPrestador(this.id).then(
          (usuario: User) => {
            this.perfil = usuario[0];
            console.log(this.perfil);

            if (usuario[0].id_serv_1) {
              const id1 = usuario[0].id_serv_1;
              this.categoriaServicoService.getServico(id1)
                .then((dado: Servico) =>
                  this.perfil.nome_serv_1 = dado.nome);
            }

            if (usuario[0].id_serv_2) {
              const id2 = usuario[0].id_serv_2;
              this.categoriaServicoService.getServico(id2)
                .then((dado: Servico) =>
                  this.perfil.nome_serv_2 = dado.nome);
            }

            if (usuario[0].id_serv_3) {
              const id3 = usuario[0].id_serv_3;
              this.categoriaServicoService.getServico(id3)
                .then((dado: Servico) =>
                  this.perfil.nome_serv_3 = dado.nome);
            }

            // console.log(this.perfil.nome_serv_2);
            // console.log(this.perfil.nome_serv_3);

            // this.globalService.updatePrestador(this.perfil);
          }
        );
      }
    );

    this.formulario = this.formBuilder.group({
      pergunta: [null]
    });
  }

  enviarPergunta() {
    console.log(this.formulario.value);
  }

  voltar() {
    this.globalService.usuarioTipo.subscribe(
      (tipo_usuario: number) => {
        if (tipo_usuario === 1) {
          this.router.navigate(['/home/user']);
          window.location.reload();
        }

        if (tipo_usuario === 2) {
          this.router.navigate(['/home/prestador']);
          window.location.reload();
        }

        if (tipo_usuario === 3) {
          this.router.navigate(['/home/admin']);
          window.location.reload();
        }
      }
    );
  }

  contratar() {
    this.confirmationService.confirm({
      message: 'Você deseja contratar esse profissional?',
      accept: () => {
        this.contrato = true;
      },
      reject: () => {
        this.contrato = false;
      }
    });
  }
}
