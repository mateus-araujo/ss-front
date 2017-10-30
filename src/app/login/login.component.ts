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

  constructor(
    private formBuilder: FormBuilder,
    private http: Http) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      usuario: [null, Validators.required],
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
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .map(res => res)
        .subscribe(
        dados => {
          // console.log(dados);
          this.formulario.reset();
        },
        (error: any) => alert('erro')
        );

      this.submitted = true;
      this.msgs = [];
      this.msgs = [{
        severity: 'success',
        summary: 'Login',
        detail: 'Login realizado'
      }];
    } else {
      this.checkFormValidations(this.formulario);

      this.submitted = false;
      this.msgs = [];
      this.msgs = [{
        severity: 'error',
        summary: 'Login',
        detail: 'Dados incorretos'
      }];
    }
  }

  enviar() {
    if (this.recsenha.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .map(res => res)
        .subscribe(
        dados => {
          // console.log(dados);
          this.recsenha.reset();
        },
        (error: any) => alert('erro')
        );

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
