import { GlobalService } from './../compartilhado/services/global.service';
import { Router } from '@angular/router';
import { User } from './../compartilhado/models/user.model';
import { UsuarioService } from './../compartilhado/services/usuario.service';
import { Http } from '@angular/http';
import { Message } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  recsenha: FormGroup;
  mostrar: boolean;
  msgs: Message[] = [];
  submitted: boolean;
  usuario: User;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router,
    private globalService: GlobalService,
    private usuarioService: UsuarioService) {

      this.usuario = null;
    }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required],
      lembrar: [false]
    });

    this.recsenha = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  mostrarRec() {
    this.mostrar = true;
  }

  checkFieldValidation(field) {
    return !this.formulario.get(field).valid &&
      (this.formulario.get(field).touched ||
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

  login() {
    if (this.formulario.valid) {

      const user = new User();
      user.email = this.formulario.get('email').value;
      user.password = this.formulario.get('senha').value;

      this.usuarioService.login(user)
        .then((dados: User) => {
          this.usuario = dados;
          console.log(this.usuario);

          this.globalService.updateUsuario(this.usuario.tipo_usuario);
          this.globalService.updateLogin(true);

          this.globalService.usuarioTipo.subscribe(
            (tipo_usuario: number) => {
              if (tipo_usuario === 1) {
                this.router.navigate(['/home/user']);
                window.location.reload();
              } else if (tipo_usuario === 2) {
                this.router.navigate(['/home/prestador']);
                window.location.reload();
              } else if (tipo_usuario === 3) {
                this.router.navigate(['/home/admin']);
                window.location.reload();
              }
            }
          );

          if (this.usuario === null) {
            this.msgs = [];
            this.msgs = [{
              severity: 'warn',
              summary: 'Login',
              detail: 'Dados incorretos, tente novamente'
            }];
          } else if (this.usuario) {
            this.msgs = [];
            this.msgs = [{
              severity: 'success',
              summary: 'Login',
              detail: 'Login realizado'
            }];
          }
        });

      this.formulario.reset();
    } else {
      this.checkFormValidations(this.formulario);

      this.submitted = false;
      this.msgs = [];
      this.msgs = [{
        severity: 'error',
        summary: 'Login',
        detail: 'Dados incorretos, tente novamente'
      }];
    }
  }

  enviar() {
    if (this.recsenha.valid) {
      // console.log(dados);
      this.recsenha.reset();

      this.submitted = true;
      this.msgs = [];
      this.msgs = [{
        severity: 'success',
        summary: 'Email enviado',
        detail: 'Em breve você receberá um link para recuperação de senha'
      }];
      this.mostrar = false;
    } else {
      this.checkFormValidations(this.recsenha);

      this.submitted = false;
      this.msgs = [];
      this.msgs = [{
        severity: 'error',
        summary: 'Email não enviado',
        detail: 'Confira seus dados'
      }];
    }
  }
}
