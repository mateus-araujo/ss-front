import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { Servico } from './../../compartilhado/models/servico.model';
import { CategoriaServicoService } from './../../compartilhado/services/categoria-servico.service';
import { CategoriaServico } from './../../compartilhado/models/categoria-servico.model';
import { Http } from '@angular/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  categoriaForm: FormGroup;
  servicoForm: FormGroup;

  displayAddCategoria: boolean;
  displayUpCategoria: boolean;
  displayAddServico: boolean;
  displayUpServico: boolean;

  mostrarCategorias: boolean;
  mostrarServicos: boolean;

  servicos: Array<Servico>;
  categoria: any;
  categoriasServico: Array<CategoriaServico>;
  categorias: SelectItem[];

  msgs: Message[] = [];

  constructor(
    private categoriaServicoService: CategoriaServicoService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private http: Http) {

    this.mostrarCategorias = true;
    this.mostrarServicos = false;

    this.categoriaServicoService
      .getCategorias()
      .then((dados: Array<CategoriaServico>) => {
        this.categoriasServico = dados;

        this.categorias = [];
        for (let index = 0; index < dados.length; index++) {
          this.categorias.push({
            label: dados[index].nome,
            value: {
              id: dados[index].id,
              nome: dados[index].nome
            }
          });
        }
      });

    this.categoriaServicoService
      .getAllServicos()
      .then((dados: Array<Servico>) => {
        this.servicos = dados;

        // this.servicos = [];
        for (let index = 0; index < dados.length; index++) {

          const id_categoria = dados[index].id_categoria;

          this.categoriaServicoService.getCategoria(id_categoria)
            .then((dado: CategoriaServico) =>
              this.servicos[index].categoria = dado.nome);
        }
      });

  }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      categoria: [null, Validators.required]
    });

    this.servicoForm = this.formBuilder.group({
      id: [null],
      categoria: [null, Validators.required],
      servico: [null, Validators.required]
    });
  }

  checkFieldValidation(field, formulario: FormGroup) {
    return !formulario.get(field).valid && (
      formulario.get(field).dirty);
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

  salvarCategoria() {
    if (this.categoriaForm.valid) {
      // console.log(dados);
      // console.log(this.formulario.value);

      const categoria = new CategoriaServico();
      categoria.nome = this.categoriaForm.value.categoria;

      this.addCategoria(categoria);

      this.categoriaForm.reset();
      this.displayAddCategoria = false;
      window.location.reload();
      this.msgs = [{
        severity: 'success',
        summary: 'Nova categoria',
        detail: 'Categoria adicionada'
      }];
    } else {
      this.checkFormValidations(this.categoriaForm);
    }
  }

  editarCategoria() {
    if (this.categoriaForm.valid) {
      // console.log(dados);
      // console.log(this.formulario.value);

      const categoria = new CategoriaServico();
      categoria.id = this.categoriaForm.value.id;
      categoria.nome = this.categoriaForm.value.categoria;

      this.updateCategoria(categoria);

      this.categoriaForm.reset();
      this.displayUpCategoria = false;
      window.location.reload();
      this.msgs = [{
        severity: 'success',
        summary: 'Concluído',
        detail: 'Categoria editada'
      }];
    } else {
      this.checkFormValidations(this.categoriaForm);
    }
  }

  salvarServico() {
    if (this.servicoForm.valid) {

      // console.log(dados);
      // console.log(this.formulario.value);

      const servico = new Servico();
      servico.nome = this.servicoForm.value.servico;
      servico.id_categoria = this.servicoForm.value.categoria.id;

      this.addServico(servico);

      this.servicoForm.reset();
      this.displayAddServico = false;
      window.location.reload();

      this.msgs = [{
        severity: 'success',
        summary: 'Novo serviço',
        detail: 'Serviço adicionado'
      }];
    } else {
      this.checkFormValidations(this.servicoForm);
    }
  }

  editarServico() {
    if (this.servicoForm.valid) {
      // console.log(dados);
      // console.log(this.formulario.value);

      const servico = new Servico();
      servico.id = this.servicoForm.value.id;
      servico.nome = this.servicoForm.value.servico;
      servico.id_categoria = this.servicoForm.value.categoria.id;

      this.updateServico(servico);

      this.servicoForm.reset();
      this.displayUpServico = false;
      window.location.reload();
      this.msgs = [{
        severity: 'success',
        summary: 'Concluído',
        detail: 'Serviço editado'
      }];
    } else {
      this.checkFormValidations(this.servicoForm);
    }
  }

  showCategorias() {
    if (this.mostrarCategorias === false) {
      this.mostrarServicos = false;
      this.mostrarCategorias = true;
    }
  }

  showServicos() {
    if (this.mostrarServicos === false) {
      this.mostrarCategorias = false;
      this.mostrarServicos = true;
    }
  }

  voltarAddCategoria() {
    this.categoriaForm.reset();
    this.displayAddCategoria = false;
  }

  voltarUpCategoria() {
    this.categoriaForm.reset();
    this.displayUpCategoria = false;
  }

  voltarAddServico() {
    this.servicoForm.reset();
    this.displayAddServico = false;
  }

  voltarUpServico() {
    this.servicoForm.reset();
    this.displayUpServico = false;
  }

  dialogAddCategoria() {
    this.displayAddCategoria = true;
  }

  dialogUpCategoria(categoria: CategoriaServico) {
    this.categoriaForm.controls['id'].patchValue(categoria.id);
    this.categoriaForm.controls['categoria'].patchValue(categoria.nome);
    this.displayUpCategoria = true;
  }

  dialogAddServico() {
    this.displayAddServico = true;
  }

  dialogUpServico(servico: Servico) {
    this.servicoForm.controls['id'].patchValue(servico.id);
    this.servicoForm.controls['servico'].patchValue(servico.nome);
    this.servicoForm.controls['categoria'].patchValue({
      'id': servico.id_categoria,
      'nome': servico.categoria
    });
    this.displayUpServico = true;
  }

  removerCategoria(categoria) {
    this.confirmationService.confirm({
      header: 'Excluir categoria',
      message: 'Deseja mesmo excluir esta categoria?',
      accept: () => {
        this.deleteCategoria(categoria);
        window.location.reload();

        this.msgs = [{
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Categoria excluída'
        }];
      },
      reject: () => {
        this.msgs = [{
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Categoria não excluída'
        }];
      }
    });
  }

  removerServico(servico) {
    this.confirmationService.confirm({
      header: 'Excluir servico',
      message: 'Deseja mesmo excluir este serviço?',
      accept: () => {
        this.deleteServico(servico);
        window.location.reload();

        this.msgs = [{
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Serviço excluído'
        }];
      },
      reject: () => {
        this.msgs = [{
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Serviço não excluído'
        }];
      }
    });
  }

  addCategoria(categoria: CategoriaServico) {
    this.categoriaServicoService.createCategoria(categoria);
  }

  addServico(servico: Servico) {
    this.categoriaServicoService.createServico(servico);
  }

  updateCategoria(categoria: CategoriaServico) {
    this.categoriaServicoService.updateCategoria(categoria.id, categoria);
  }

  updateServico(servico: Servico) {
    this.categoriaServicoService.updateServico(servico.id, servico);
  }

  deleteCategoria(categoria: CategoriaServico) {
    this.categoriaServicoService.deleteCategoria(categoria.id);
  }

  deleteServico(servico: Servico) {
    this.categoriaServicoService.deleteServico(servico.id);
  }

}
