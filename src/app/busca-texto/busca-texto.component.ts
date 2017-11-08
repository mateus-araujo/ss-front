import { UsuarioService } from './../compartilhado/services/usuario.service';
import { Usuario } from './../compartilhado/models/usuario.model';
import { Router } from '@angular/router';
import { GlobalService } from './../compartilhado/services/global.service';
import { Servico } from './../compartilhado/models/servico.model';
import { CategoriaServicoService } from './../compartilhado/services/categoria-servico.service';
import { AppComponent } from './../app.component';
import { Busca } from './../compartilhado/models/busca.model';
import { UsuarioNavComponent } from './../nav-bar/usuario/usuario-nav.component';
import { User } from './../compartilhado/models/user.model';
import { Http } from '@angular/http';
import { BuscaService } from './../compartilhado/services/busca.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-busca-texto',
  templateUrl: './busca-texto.component.html',
  styleUrls: ['./busca-texto.component.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class BuscaTextoComponent implements OnInit {

  prestadores: Array<User>;
  servico: Servico;
  pesquisa: string;

  constructor(
    private globalService: GlobalService,
    private buscaService: BuscaService,
    private usuarioService: UsuarioService,
    private categoriaServicoService: CategoriaServicoService,
    private http: Http,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.globalService.prestadoresBusca.subscribe(
      (dados: Array<User>) => {
        this.prestadores = dados;

        // console.log(dados);

        for (let i = 0; i < dados.length; i++) {
          if (dados[i].id_serv_1) {
            const id1 = dados[i].id_serv_1;
            this.categoriaServicoService.getServico(id1)
              .then((dado: Servico) =>
                this.prestadores[i].nome_serv_1 = dado.nome);
          }

          if (dados[i].id_serv_2) {
            const id2 = dados[i].id_serv_2;
            this.categoriaServicoService.getServico(id2)
              .then((dado: Servico) =>
                this.prestadores[i].nome_serv_2 = dado.nome);

          }

          if (dados[i].id_serv_3) {
            const id3 = dados[i].id_serv_3;
            this.categoriaServicoService.getServico(id3)
              .then((dado: Servico) =>
                this.prestadores[i].nome_serv_3 = dado.nome);
          }
        }
      }
    );
  }

  getServico(id: number): string {
    this.categoriaServicoService.getServico(id).then(
      (dado: Servico) => this.servico = dado
    );

    return this.servico.nome;
  }

  verPerfil(id: number) {
    this.globalService.usuarioTipo.subscribe(
      (tipo_usuario: number) => {
        console.log(id);
        if (tipo_usuario === 1) {
          this.router.navigate(['/home/user/perfil', id]);
        }

        if (tipo_usuario === 2) {
          this.router.navigate(['/home/prestador/perfil', id]);
        }

        if (tipo_usuario === 3) {
          this.router.navigate(['/home/admin/perfil', id]);
        }
      }
    );
  }

}
