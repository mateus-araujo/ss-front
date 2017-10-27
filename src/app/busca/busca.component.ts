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

  mostrar: boolean = false;

  categoriasI: CategoriaServico[];
  categorias: SelectItem[];

  servicosI: CategoriaServico[];
  servicos: SelectItem[];

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private http: Http
  ) {

    this.dropdownService.getCategorias()
      .subscribe(dados => {
        this.categoriasI = dados;

        this.categorias = [];
        for (var index = 0; index < dados.length; index++) {
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
          //console.log(dados);
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
    this.dropdownService.getServicos()
      .subscribe(dados => {
        this.servicosI = dados;

        this.servicos = [];

        //console.log(this.formulario.get('categoria').value);
        let sCategoria = this.formulario.get('categoria').value.id;

        for (var index = 0; index < dados.length; index++) {
          if ((sCategoria == dados[index].idCategoria)) {
            this.servicos.push({
              label: dados[index].nome,
              value: {
                id: dados[index].id,
                nome: dados[index].nome,
                idCategoria: dados[index].idCategoria
              }
            }
            );
          }
        }
      }
      );
  }

}
