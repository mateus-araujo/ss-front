import { CategoriaServico } from './../../compartilhado/models/categoria-servico.model';
import { DropdownService } from './../../compartilhado/services/dropdown.service';
import { CidadeBr } from './../../compartilhado/models/cidade-br.model';
import { EstadoBr } from './../../compartilhado/models/estado-br.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';




import 'rxjs/add/operator/map';
import { ConfirmationService, MenuItem, Message, SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-pjuridica',
  templateUrl: './pjuridica.component.html',
  styleUrls: ['./pjuridica.component.css'],
  providers: [ConfirmationService]
})
export class PJuridicaComponent implements OnInit {

  formulario: FormGroup;
  submitted: boolean;

  estadosBr: EstadoBr[];
  estados: string[];
  estado: string;

  cidadesBr: CidadeBr[];

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
    private dropdownService: DropdownService,
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router) {

    this.dropdownService.getCategorias()
      .subscribe(dados => {
        this.categoriasI = dados;

        this.categorias1 = [];
        this.categorias2 = [];
        this.categorias3 = [];
        for (var index = 0; index < dados.length; index++) {
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
      }
      );
  }

  ngOnInit() {
    let qtd = 1;

    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      conf_senha: [null, [Validators.required, Validators.minLength(6)]],
      usuario_tipo: [{"id": 3,
      "nome": "Empresa"}],
      cnpj: [null, Validators.required],
      nomeFantasia: [null, Validators.required],
      razaoSocial: [null, Validators.required],
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
        complemento: [null, Validators.required],
        numero: [null, Validators.required]
      }),
      servicosPrestados: this.formBuilder.array([
        this.createServico(qtd)
      ]),
      qtdServicos: [qtd],
      descricao: [null, Validators.required]
    });
  }

  /* passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('senha').value !== c.get('conf_senha').value) {
      return { invalid: true };
    }
  } */

  cancelar() {
    this.confirmationService.confirm({
      message: 'Desejar cancelar o cadastro e voltar para a página inicial?',
      header: 'Cancelar cadastro',
      icon: 'fa fa-close',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Cadastro cancelado' }];
        this.formulario.reset();
        //this.router.navigate(['/home']);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Cancelamento não concluído' }];
      },
    });
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Confirma os dados do cadastro?',
      header: 'Confirmar cadastro',
      icon: 'fa fa-question-circle',
      accept: () => {
        console.log(this.formulario);

        if (this.formulario.valid) {
          this.http
            .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
            .map(res => res)
            .subscribe(
            dados => {
              console.log(dados);
              // this.formulario.reset();
            },
            (error: any) => alert('erro')
            );

          this.submitted = true;
          this.msgs = [];
          this.msgs = [{
            severity: 'success',
            summary: 'Confirmado',
            detail: 'Cadastro concluído'
          }];
        } else {
          console.log("formulário inválido");

          this.checkFormValidations(this.formulario);

          if (this.formulario.controls['senha'].value !== this.formulario.controls['conf_senha'].value) {
            this.formulario.controls['senha'].markAsDirty;
            this.formulario.controls['conf_senha'].markAsDirty;
          }

          this.submitted = false;
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

  buscarEstados(event) {
    this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        this.estadosBr = dados;

        this.estados = [];
        for (var index = 0; index < dados.length; index++) {
          this.estados.push(dados[index].sigla);
        }
      }
      );
  }

  buscarServicos(i: number) {
    this.dropdownService.getServicos()
      .subscribe(dados => {
        this.servicosI = dados;

        if (i == 0) {
          this.servicos1 = [];
        } else if (i == 1) {
          this.servicos2 = [];
        } else if (i == 2) {
          this.servicos3 = [];
        }

        console.log(this.formulario.get('servicosPrestados').value[i]);
        let sCategoria = this.formulario.get('servicosPrestados').value[i].categoria.id;

        for (var index = 0; index < dados.length; index++) {
          if ((sCategoria == dados[index].idCategoria) && i == 0) {
            this.servicos1.push({
              label: dados[index].nome,
              value: {
                id: dados[index].id,
                nome: dados[index].nome,
                idCategoria: dados[index].idCategoria
              }
            }
            );
          } else if ((sCategoria == dados[index].idCategoria) && i == 1) {
            this.servicos2.push({
              label: dados[index].nome,
              value: {
                id: dados[index].id,
                nome: dados[index].nome,
                idCategoria: dados[index].idCategoria
              }
            }
            );
          } else if ((sCategoria == dados[index].idCategoria) && i == 2) {
            this.servicos3.push({
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

  createServico(qtd: number): FormGroup {
    return this.formBuilder.group({
      id: [qtd],
      categoria: [null, Validators.required],
      servico: [null, Validators.required]
    })
  }

  addServico(): void {
    let val = this.formulario.get('qtdServicos').value;

    if (val < 3) {
      const control = <FormArray>this.formulario.get('servicosPrestados');
      control.push(this.createServico(val + 1));
      this.formulario.get('qtdServicos').patchValue(
        this.formulario.get('qtdServicos').value + 1);
    } else {
      this.msgs = [{
        severity: 'warn',
        summary: 'Quantidade excedida',
        detail: 'Quantidade máxima de 3 serviços'
      }];
    }
  }

  removeServico(index: number): void {
    let val = this.formulario.get('qtdServicos').value;
    if (val > 1) {
      const control = <FormArray>this.formulario.get('servicosPrestados');
      control.removeAt(index);
      this.formulario.get('qtdServicos').patchValue(
        this.formulario.get('qtdServicos').value - 1);
    } else {
      this.msgs = [{
        severity: 'warn',
        summary: 'Não é possível remover',
        detail: 'Cadastre pelo menos um serviço'
      }];
    }
  }

  consultaCEP() {

    let cep = this.formulario.get('endereco.cep').value;

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
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
      endereco: {
        estado: dados.uf,
        cidade: dados.localidade,
        bairro: dados.bairro,
        complemento: dados.complemento,
        logradouro: dados.logradouro
      }
    });
  }

  resetDataForm() {
    this.formulario.patchValue({
      endereco: {
        estado: null,
        cidade: null,
        bairro: null,
        complemento: null,
        logradouro: null
      }
    });
  }

  get diagnostic() {
    return JSON.stringify(this.formulario.value);
  }
}
