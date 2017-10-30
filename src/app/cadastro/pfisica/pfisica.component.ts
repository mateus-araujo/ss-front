import { Servico } from './../../compartilhado/models/servico.model';
import { CategoriaServicoService } from './../../compartilhado/services/categoria-servico.service';
import { CategoriaServico } from './../../compartilhado/models/categoria-servico.model';
import { DropdownService } from './../../compartilhado/services/dropdown.service';
import { EstadoBr } from './../../compartilhado/models/estado-br.model';
import { CidadeBr } from './../../compartilhado/models/cidade-br.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

import { SelectItem, MenuItem, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-pfisica',
  templateUrl: './pfisica.component.html',
  styleUrls: ['./pfisica.component.css'],
  providers: [ConfirmationService]
})
export class PFisicaComponent implements OnInit {

  formulario: FormGroup;
  submitted: boolean;

  estadosBr: EstadoBr[];
  estados: string[];
  estado: string;

  categoriasI: CategoriaServico[];
  categorias1: SelectItem[];
  categorias2: SelectItem[];
  categorias3: SelectItem[];

  servicosI: CategoriaServico[];
  servicos1: SelectItem[];
  servicos2: SelectItem[];
  servicos3: SelectItem[];

  msgs: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private categoriaServicoService: CategoriaServicoService,
    private dropdownService: DropdownService,
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router) {

    this.categoriaServicoService.getCategorias()
      .then((dados: Array<CategoriaServico>) => {
        this.categoriasI = dados;

        this.categorias1 = [];
        this.categorias2 = [];
        this.categorias3 = [];
        for (let index = 0; index < dados.length; index++) {
          this.categorias1.push({
            label: dados[index].nome,
            value: {
              id: dados[index].id,
              nome: dados[index].nome
            }
          });

          this.categorias2.push({
            label: dados[index].nome,
            value: {
              id: dados[index].id,
              nome: dados[index].nome
            }
          });

          this.categorias3.push({
            label: dados[index].nome,
            value: {
              id: dados[index].id,
              nome: dados[index].nome
            }
          });
        }
      });
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nomeCompleto: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      conf_senha: [null, [Validators.required, Validators.minLength(6)]],
      tipo_usuario: [1],
      prestador: [false],
    });
  }

  checkPrestador() {
    const qtd = 1;

    if (this.formulario.controls['prestador'].value) {
      this.formulario.get('tipo_usuario').patchValue(2);

      this.formulario.addControl('prestadorDados', this.formBuilder.group({
        cpf: [null, Validators.required],
        rg: [null, [Validators.required]],
        sexo: [null, Validators.required],
        dataNascimento: [null, [Validators.required]],
        telefone: this.formBuilder.group({
          telefone1: [null, Validators.required],
          telefone2: [null, Validators.required]
        }),
        endereco: this.formBuilder.group({
          cep: [null, Validators.required],
          estado: [null, Validators.required],
          cidade: [null, Validators.required],
          bairro: [null, Validators.required],
          logradouro: [null, Validators.required],
          complemento: [null],
          numero: [null, Validators.required]
        }),
        servicosPrestados: this.formBuilder.array([
          this.createServico(qtd)
        ]),
        qtdServicos: [qtd],
        descricao: [null, Validators.required]
      }));
    } else {
      this.formulario.get('tipo_usuario').patchValue(1);

      this.formulario.removeControl('prestadorDados');
    }

    return this.formulario.controls['prestador'].value;
  }

  cancelar() {
    this.confirmationService.confirm({
      message: 'Desejar cancelar o cadastro e voltar para a página inicial?',
      header: 'Cancelar cadastro',
      icon: 'fa fa-close',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Cadastro cancelado' }];
        this.formulario.reset();
        // this.router.navigate(['/home']);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Cancelamento não concluído' }];
      },
    });
  }

  salvar() {
    this.confirmationService.confirm({
      header: 'Confirmar cadastro',
      message: 'Confirma os dados do cadastro?',
      icon: 'fa fa-question-circle',
      accept: () => {
        console.log(this.formulario);

        if (this.formulario.valid) {



          this.msgs = [];
          this.msgs = [{
            severity: 'success',
            summary: 'Confirmado',
            detail: 'Cadastro concluído'
          }];
        } else {
          console.log('formulário inválido');

          this.checkFormValidations(this.formulario);

          if (this.formulario.controls['senha'].value !== this.formulario.controls['conf_senha'].value) {
            this.formulario.controls['senha'].markAsDirty();
            this.formulario.controls['conf_senha'].markAsDirty();
          }

          this.msgs = [];
          this.msgs = [{
            severity: 'error',
            summary: 'Formulário inválido',
            detail: 'Corrija os dados e tente novamente'
          }];
        }
        // this.router.navigate(['/home']);
      },
      reject: () => {
        this.msgs = [{
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Cadastro não concluído'
        }];
      },
    });
  }

  checkFormValidations(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      control.markAsDirty();
      if (control instanceof FormGroup) {
        this.checkFormValidations(control);
      }
    });
  }

  checkFieldValidation(field) {
    return !this.formulario.get(field).valid &&
      (this.formulario.get(field).touched ||
        this.formulario.get(field).dirty);
  }

  buscarEstados() {
    this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        this.estadosBr = dados;

        this.estados = [];
        for (let index = 0; index < dados.length; index++) {
          this.estados.push(dados[index].sigla);
        }
      }
      );
  }

  buscarServicos(i: number) {
    this.categoriaServicoService.getServicos(
      this.formulario.get('prestadorDados.servicosPrestados').value[i].categoria.id
    )
      .then((dados: Array<Servico>) => {
        this.servicosI = dados;

        if (i === 0) {
          this.servicos1 = [];
        } else if (i === 1) {
          this.servicos2 = [];
        } else if (i === 2) {
          this.servicos3 = [];
        }

        // console.log(this.formulario.get('prestadorDados.servicosPrestados').value[i]);

        for (let index = 0; index < dados.length; index++) {
          if (i === 0) {
            this.servicos1.push({
              label: dados[index].nome,
              value: {
                id: dados[index].id,
                nome: dados[index].nome,
                id_categoria: dados[index].id_categoria
              }
            }
            );
          } else if (i === 1) {
            this.servicos2.push({
              label: dados[index].nome,
              value: {
                id: dados[index].id,
                nome: dados[index].nome,
                id_categoria: dados[index].id_categoria
              }
            }
            );
          } else if (i === 2) {
            this.servicos3.push({
              label: dados[index].nome,
              value: {
                id: dados[index].id,
                nome: dados[index].nome,
                id_categoria: dados[index].id_categoria
              }
            }
            );
          }
        }
      });
  }

  createServico(qtd: number): FormGroup {
    return this.formBuilder.group({
      id: [qtd],
      categoria: [null, Validators.required],
      servico: [null, Validators.required]
    });
  }

  addServico(): void {
    const val = this.formulario.get('prestadorDados.qtdServicos').value;

    if (val < 3) {
      const control = <FormArray>this.formulario.get('prestadorDados.servicosPrestados');
      control.push(this.createServico(val + 1));
      this.formulario.get('prestadorDados.qtdServicos').patchValue(
        this.formulario.get('prestadorDados.qtdServicos').value + 1);
    } else {
      this.msgs = [{
        severity: 'warn',
        summary: 'Quantidade excedida',
        detail: 'Quantidade máxima de 3 serviços'
      }];
    }
  }

  removeServico(index: number): void {
    const val = this.formulario.get('prestadorDados.qtdServicos').value;
    if (val > 1) {
      const control = <FormArray>this.formulario.get('prestadorDados.servicosPrestados');
      control.removeAt(index);
      this.formulario.get('prestadorDados.qtdServicos').patchValue(
        this.formulario.get('prestadorDados.qtdServicos').value - 1);
    } else {
      this.msgs = [{
        severity: 'warn',
        summary: 'Não é possível remover',
        detail: 'Cadastre pelo menos um serviço'
      }];
    }
  }

  consultaCEP() {

    let cep = this.formulario.get('prestadorDados.endereco.cep').value;

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {

      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetDataForm();

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados.json())
          .subscribe(dados => this.setDataFromCEP(dados));
      }
    }
  }

  setDataFromCEP(dados) {

    this.formulario.patchValue({
      prestadorDados: {
        endereco: {
          estado: dados.uf,
          cidade: dados.localidade,
          bairro: dados.bairro,
          complemento: dados.complemento,
          logradouro: dados.logradouro
        }
      }
    });

  }

  resetDataForm() {
    this.formulario.patchValue({
      prestadorDados: {
        endereco: {
          estado: null,
          cidade: null,
          bairro: null,
          complemento: null,
          logradouro: null
        }
      }
    });
  }

  get diagnostic() {
    return JSON.stringify(this.formulario.value);
  }
}
