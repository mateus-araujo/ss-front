import { Categoria } from './../../compartilhado/models/categoria.model';
import { Http } from '@angular/http';
import { CategoriaService } from './../../compartilhado/services/categoria.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  formulario: FormGroup;
  displayDialog: boolean;
  submitted: boolean;

  categorias: Array<Categoria>;

  constructor(
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private http: Http) { 

    this.categoriaService
      .getCategorias()
      .then((categorias:Array<Categoria>) => this.categorias = categorias);
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      categoria: [null, Validators.required]
    });
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
    this.displayDialog = false;
  }

  salvar() {
    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .map(res => res)
        .subscribe(
        dados => {
          //console.log(dados);
          //console.log(this.formulario.value);

          let categoria = new Categoria();
          categoria.nome = this.formulario.value.categoria;
          
          this.addCategoria(categoria);
          
          this.formulario.reset();
          this.displayDialog = false;
          window.location.reload();
        },
        (error: any) => alert('erro')
        );

      this.submitted = true;
    } else {
      this.checkFormValidations(this.formulario);

      this.submitted = false;
    }
  }

  newCategoria() {
    this.displayDialog = true;
  }

  addCategoria(categoria: Categoria) {
    this.categoriaService.createCategoria(categoria);
  }

}
