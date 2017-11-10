import { GlobalService } from './../../compartilhado/services/global.service';
import { UsuarioService } from './../../compartilhado/services/usuario.service';
import { User } from './../../compartilhado/models/user.model';
import { Usuario } from './../../compartilhado/models/usuario.model';
import { Servico } from './../../compartilhado/models/servico.model';
import { CategoriaServicoService } from './../../compartilhado/services/categoria-servico.service';
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
    private categoriaServicoService: CategoriaServicoService,
    private dropdownService: DropdownService,
    private usuarioService: UsuarioService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router) {

    this.categoriaServicoService.getCategorias()
      .then((dados: Array<CategoriaServico>) => {
        this.categoriasI = dados;
        dados = dados.sort(function (a, b: CategoriaServico) {
          return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
        });


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
      }
      );
  }

  ngOnInit() {
    const qtd = 1;

    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      conf_senha: [null, [Validators.required, Validators.minLength(6)]],
      tipo_usuario: [2],
      cnpj: [null, Validators.required],
      nomeFantasia: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      telefone: this.formBuilder.group({
        telefone1: [null, Validators.required],
        telefone2: [null]
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
    });
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
      message: 'Confirma os dados do cadastro?',
      header: 'Confirmar cadastro',
      icon: 'fa fa-question-circle',
      accept: () => {
        console.log(this.formulario);

        if (this.formulario.valid) {
          const usuario = new User();
          usuario.name = this.formulario.get('nomeFantasia').value;
          usuario.email = this.formulario.get('email').value;
          usuario.username = this.formulario.get('usuario').value;
          usuario.password = this.formulario.get('senha').value;
          usuario.tipo_usuario = this.formulario.get('tipo_usuario').value;

          usuario.telefone = this.formulario.get('telefone.telefone1').value;

          if (this.formulario.get('telefone.telefone2').value) {
            usuario.celular = this.formulario.get('telefone.telefone2').value;
          } else {
            usuario.celular = 'Não informado';
          }
          usuario.rg = 'rg';
          usuario.data_nasc = 'pj';
          usuario.cep = this.formulario.get('endereco.cep').value;
          usuario.bairro = this.formulario.get('endereco.bairro').value;
          usuario.logradouro = this.formulario.get('endereco.logradouro').value;
          usuario.cidade = this.formulario.get('endereco.cidade').value;

          if (this.formulario.get('endereco.complemento').value) {
            usuario.complemento = this.formulario.get('endereco.complemento').value;
          } else {
            usuario.complemento = 'Não informado';
          }

          usuario.estado = this.formulario.get('endereco.estado').value;
          usuario.numero = this.formulario.get('endereco.numero').value;
          usuario.aprovado = 1; // usuário pendente a aprovação

          if (this.formulario.get('servicosPrestados').value[0] !== undefined
            && this.formulario.get('servicosPrestados').value[0]) {
            usuario.id_serv_1 = this.formulario.get('servicosPrestados').value[0].servico.id;
          } else { usuario.id_serv_1 = null; }

          if (this.formulario.get('servicosPrestados').value[1] !== undefined
            && this.formulario.get('servicosPrestados').value[1]) {
            usuario.id_serv_2 = this.formulario.get('servicosPrestados').value[1].servico.id;
          } else { usuario.id_serv_2 = null; }

          if (this.formulario.get('servicosPrestados').value[2] !== undefined
            && this.formulario.get('servicosPrestados').value[2]) {
            usuario.id_serv_3 = this.formulario.get('servicosPrestados').value[2].servico.id;
          } else { usuario.id_serv_3 = null; }

          usuario.descricao = this.formulario.get('descricao').value;
          usuario.tipo_prestador = 1; // prestador pessoa jurídica
          usuario.avaliacao = 'Não informado';
          usuario.foto = 'Não informado';

          usuario.cnpj = this.formulario.get('cnpj').value;
          usuario.nome_fantasia = this.formulario.get('nomeFantasia').value;
          usuario.razao_social = this.formulario.get('razaoSocial').value;

          this.addUser(usuario);

          this.msgs = [];
          this.msgs = [{
            severity: 'success',
            summary: 'Confirmado',
            detail: 'Cadastro concluído'
          }];

          this.formulario.reset();

          this.globalService.usuarioTipo.subscribe(
            (tipo_usuario: number) => {
              if (tipo_usuario === 1) {
                this.router.navigate(['/home/user/login']);
              }

              if (tipo_usuario === 2) {
                this.router.navigate(['/home/prestador/login']);
              }

              if (tipo_usuario === 3) {
                this.router.navigate(['/home/admin/login']);
              }
            }
          );

          window.location.reload();
        } else {
          console.log('formulário inválido');

          this.checkFormValidations(this.formulario);

          if (this.formulario.controls['senha'].value !== this.formulario.controls['conf_senha'].value) {
            this.formulario.controls['senha'].markAsDirty();
            this.formulario.controls['conf_senha'].markAsDirty();
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
        for (let index = 0; index < dados.length; index++) {
          this.estados.push(dados[index].sigla);
        }
      }
      );
  }

  buscarServicos(i: number) {
    const id_categoria = this.formulario.get('servicosPrestados').value[i].categoria.id;

    console.log(this.formulario.get('servicosPrestados').value[i].categoria.id);

    this.categoriaServicoService.getServicos(id_categoria)
      .then((dados: Array<Servico>) => {
        this.servicosI = dados;
        dados = dados.sort(function (a, b: Servico) {
          return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
        });


        if (i === 0) {
          this.servicos1 = [];
        } else if (i === 1) {
          this.servicos2 = [];
        } else if (i === 2) {
          this.servicos3 = [];
        }

        // console.log(i);
        // console.log(this.formulario.get('prestadorDados.servicosPrestados').value[i].categoria.id);

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
    const val = this.formulario.get('qtdServicos').value;

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
    const val = this.formulario.get('qtdServicos').value;
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

  addUser(user: User) {
    this.usuarioService.createUser(user);
  }

  get diagnostic() {
    return JSON.stringify(this.formulario.value);
  }
}
