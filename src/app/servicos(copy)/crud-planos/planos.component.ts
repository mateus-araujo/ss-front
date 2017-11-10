import { PlanosService } from './../../compartilhado/services/planos.service';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Plano } from './../../compartilhado/models/plano.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  planoForm: FormGroup;

  displayAddPlano: boolean;
  displayUpPlano: boolean;

  planos: Array<Plano>;
  msgs: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private http: Http,
    private planosService: PlanosService
  ) {

    this.planosService.getPlanos()
      .then((dados: Array<Plano>) => {
        this.planos = dados;

        for (let index = 0; index < dados.length; index++) {
          if (dados[index].pessoa === 1) {
            this.planos[index].pessoa_tipo = 'Pessoa Física';
          } else if (dados[index].pessoa === 2) {
            this.planos[index].pessoa_tipo = 'Pessoa Jurídica';
          }
        }
      });
  }

  ngOnInit() {
    this.planoForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      preco: [null, Validators.required],
      pessoa: [null, Validators.required]
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

  salvarPlano() {
    if (this.planoForm.valid) {
      // console.log(dados);
      // console.log(this.formulario.value);

      const plano = new Plano();
      plano.id = this.planoForm.value.id;
      plano.nome = this.planoForm.value.nome;
      plano.preco = this.planoForm.value.preco;
      plano.pessoa = this.planoForm.value.pessoa;

      this.addPlano(plano);

      this.planoForm.reset();
      this.displayAddPlano = false;
      window.location.reload();
      this.msgs = [{
        severity: 'success',
        summary: 'Novo plano',
        detail: 'Plano adicionado'
      }];
    } else {
      this.checkFormValidations(this.planoForm);
    }
  }

  editarPlano() {
    if (this.planoForm.valid) {
      // console.log(dados);
      // console.log(this.formulario.value);

      const plano = new Plano();
      plano.id = this.planoForm.value.id;
      plano.nome = this.planoForm.value.nome;
      plano.preco = this.planoForm.value.preco;
      plano.pessoa = this.planoForm.value.pessoa;

      this.updatePlano(plano);

      this.planoForm.reset();
      this.displayUpPlano = false;
      window.location.reload();
      this.msgs = [{
        severity: 'success',
        summary: 'Concluído',
        detail: 'Plano editado'
      }];
    } else {
      this.checkFormValidations(this.planoForm);
    }
  }

  removerPlano(plano) {
    this.confirmationService.confirm({
      header: 'Excluir plano',
      message: 'Deseja mesmo excluir este plano?',
      accept: () => {
        this.deletePlano(plano);
        window.location.reload();

        this.msgs = [{
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Plano excluído'
        }];
      },
      reject: () => {
        this.msgs = [{
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Plano não excluído'
        }];
      }
    });
  }

  voltarAddPlano() {
    this.planoForm.reset();
    this.displayAddPlano = false;
  }

  voltarUpPlano() {
    this.planoForm.reset();
    this.displayUpPlano = false;
  }

  dialogAddPlano() {
    this.displayAddPlano = true;
  }

  dialogUpPlano(plano: Plano) {
    this.planoForm.controls['id'].patchValue(plano.id);
    this.planoForm.controls['nome'].patchValue(plano.nome);
    this.planoForm.controls['preco'].patchValue(plano.preco);
    this.planoForm.controls['pessoa'].patchValue(plano.pessoa);
    this.displayUpPlano = true;
  }

  addPlano(plano: Plano) {
    this.planosService.createPlano(plano);
  }

  updatePlano(plano: Plano) {
    this.planosService.updatePlano(plano.id, plano);
  }

  deletePlano(plano: Plano) {
    this.planosService.deletePlano(plano.id);
  }

}
