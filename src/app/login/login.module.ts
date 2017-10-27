import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { ErrorComponent } from './../compartilhado/error-component/error.component';

import { NavBarModule } from './../nav-bar/nav-bar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroModule } from './../cadastro/cadastro.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, DialogModule, CheckboxModule, InputTextModule, FieldsetModule, 
  GrowlModule, PanelModule } from 'primeng/primeng';
  
import { LoginComponent } from './login.component';
import { AdministradorLoginComponent } from './administrador/administrador-login.component';
import { UsuarioLoginComponent } from './usuario/usuario-login.component';
import { PrestadorLoginComponent } from './prestador/prestador-login.component';

@NgModule({
  imports: [
    CommonModule,
    CadastroModule,
    NavBarModule,
    FormsModule,
    ReactiveFormsModule,
    CompartilhadoModule,
    
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    FieldsetModule,
    GrowlModule,
    PanelModule
  ],
  declarations: [ 
    LoginComponent, 
    AdministradorLoginComponent, 
    UsuarioLoginComponent,
    PrestadorLoginComponent ]
})
export class LoginModule { }
