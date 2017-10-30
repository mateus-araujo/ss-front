import { Servico } from './../compartilhado/models/servico.model';
import { CategoriaServicoService } from './../compartilhado/services/categoria-servico.service';
import { CategoriaServico } from './../compartilhado/models/categoria-servico.model';
import { DropdownService } from './../compartilhado/services/dropdown.service';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {

  formulario: FormGroup;
  submitted: boolean;

  mostrar: boolean;

  categoriasI: CategoriaServico[];
  categorias: SelectItem[];

  servicosI: CategoriaServico[];
  servicos: SelectItem[];

  constructor(
    private formBuilder: FormBuilder,
    private categoriaServicoService: CategoriaServicoService,
    private dropdownService: DropdownService,
    private http: Http
  ) {

    this.categoriaServicoService.getCategorias()
      .then((dados: Array<CategoriaServico>) => {
        this.categoriasI = dados;

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
      nome: [null],
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

  buscar() {
    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .map(res => res)
        .subscribe(
        dados => {
          // console.log(dados);
          console.log(this.formulario.value);
          this.formulario.reset();
          this.mostrar = false;
        },
        (error: any) => alert('erro')
        );

      this.submitted = true;
    } else {
      this.checkFormValidations(this.formulario);

      this.submitted = false;
    }
  }

  buscarServicos() {
    this.categoriaServicoService.getServicos(
      this.formulario.get('categoria').value.id
    ).then((dados: Array<Servico>) => {
      this.servicosI = dados;
      this.servicos = [];

      // console.log(this.formulario.get('categoria').value);

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
