import { Router } from '@angular/router';
import { GlobalService } from './../compartilhado/services/global.service';
import { User } from './../compartilhado/models/user.model';
import { BuscaService } from './../compartilhado/services/busca.service';
import { Busca } from './../compartilhado/models/busca.model';
import { Servico } from './../compartilhado/models/servico.model';
import { CategoriaServicoService } from './../compartilhado/services/categoria-servico.service';
import { CategoriaServico } from './../compartilhado/models/categoria-servico.model';
import { DropdownService } from './../compartilhado/services/dropdown.service';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-busca-dialog',
  templateUrl: './busca-dialog.component.html',
  styleUrls: ['./busca-dialog.component.css']
})
export class BuscaDialogComponent implements OnInit {

  formulario: FormGroup;
  mostrar: boolean;

  categoriasI: CategoriaServico[];
  categorias: SelectItem[];

  servicosI: CategoriaServico[];
  servicos: SelectItem[];

  constructor(
    private formBuilder: FormBuilder,
    private buscaService: BuscaService,
    private categoriaServicoService: CategoriaServicoService,
    private globalService: GlobalService,
    private dropdownService: DropdownService,
    private router: Router,
    private http: Http
  ) {

    this.categoriaServicoService.getCategorias()
      .then((dados: Array<CategoriaServico>) => {
        this.categoriasI = dados;
        dados = dados.sort(function (a, b: CategoriaServico) {
          return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
        });


        this.categorias = [];
        for (let index = 0; index < dados.length; index++) {
          this.categorias.push({
            label: dados[index].nome,
            value: {
              id: dados[index].id,
              nome: dados[index].nome
            }
          }
          );

        }
      }
      );
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      categoria: [null, Validators.required],
      servico: [null]
    });
  }

  mostrarBusca() {
    this.mostrar = true;
  }

  checkFieldValidation(field) {
    return !this.formulario.get(field).valid && (
      this.formulario.get(field).dirty);
  }

  checkFormValidations(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsDirty();
      if (control instanceof FormGroup) {
        this.checkFormValidations(control);
      }
    });
  }

  voltar() {
    this.formulario.reset();
    this.mostrar = false;
  }

  buscarF() {
    if (this.formulario.valid) {

      const busca = new Busca;
      if (this.formulario.get('categoria').value !== undefined
        && this.formulario.get('categoria').value) {
        busca.id_categoria = this.formulario.get('categoria').value.id;
      }
      if (this.formulario.get('servico').value !== undefined
        && this.formulario.get('servico').value) {
        busca.id_servico = this.formulario.get('servico').value.id;
      }

      this.buscaService.getPrestadores(
        busca
      ).then((dados: Array<User>) => {
        this.globalService.updatePrestadores(dados);
      });

      this.globalService.usuarioTipo.subscribe(
        (tipo_usuario: number) => {
          if (tipo_usuario === 1) {
            this.router.navigate(['/home/user/busca']);
          }

          if (tipo_usuario === 2) {
            this.router.navigate(['/home/prestador/busca']);
          }

          if (tipo_usuario === 3) {
            this.router.navigate(['/home/admin/busca']);
          }
        }
      );

      console.log(this.formulario.value);
      this.formulario.reset();
      this.mostrar = false;

    } else {
      this.checkFormValidations(this.formulario);
    }
  }

  buscarServicos() {
    this.categoriaServicoService.getServicos(
      this.formulario.get('categoria').value.id
    ).then((dados: Array<Servico>) => {
      this.servicosI = dados;
      dados = dados.sort(function (a, b: Servico) {
        return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
      });

      this.servicos = [];
      for (let index = 0; index < dados.length; index++) {
        this.servicos.push({
          label: dados[index].nome,
          value: {
            id: dados[index].id,
            nome: dados[index].nome,
            id_categoria: dados[index].id_categoria
          }
        });
      }
    });
  }
}
