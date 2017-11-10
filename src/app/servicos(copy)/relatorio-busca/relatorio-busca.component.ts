import { Servico } from './../../compartilhado/models/servico.model';
import { CategoriaServico } from './../../compartilhado/models/categoria-servico.model';
import { CategoriaServicoService } from './../../compartilhado/services/categoria-servico.service';
import { Http } from '@angular/http';
import { BuscaService } from './../../compartilhado/services/busca.service';
import { Busca } from './../../compartilhado/models/busca.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-busca',
  templateUrl: './relatorio-busca.component.html',
  styleUrls: ['./relatorio-busca.component.css']
})
export class RelatorioBuscaComponent implements OnInit {

  buscas: Array<Busca>;

  constructor(
    private buscaService: BuscaService,
    private categoriaServicoService: CategoriaServicoService,
    private http: Http) {
    this.buscaService.getBuscas().then(
      (dados: Array<Busca>) => {
        this.buscas = dados;

        for (let i = 0; i < dados.length; i++) {
          if (dados[i].id_categoria) {
            const id = dados[i].id_categoria;
            this.categoriaServicoService.getCategoria(id).then(
              (dado: CategoriaServico) => this.buscas[i].categoria = dado.nome
            );
          } else {
            this.buscas[i].categoria = 'Não informado';
          }

          if (dados[i].id_servico) {
            const id = dados[i].id_servico;
            this.categoriaServicoService.getServico(id).then(
              (dado: Servico) => this.buscas[i].servico = dado.nome
            );
          } else {
            this.buscas[i].servico = 'Não informado';
          }

          if (dados[i].texto_busca === '') {
            this.buscas[i].texto_busca = 'Não informado';
          }
        }
      }
    );
  }

  ngOnInit() {
  }

}
