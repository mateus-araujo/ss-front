import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { AppRoutingModule } from './../app-routing.module';
import { LoginModule } from './../login/login.module';
import { CadastroModule } from './../cadastro/cadastro.module';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

import { UsuarioHomeComponent } from './usuario/usuario-home.component';
import { AdministradorHomeComponent } from './administrador/administrador-home.component';
import { PrestadorHomeComponent } from './prestador/prestador-home.component';

@NgModule({
  imports: [
    CommonModule,
    NavBarModule,
    AppRoutingModule,
    CadastroModule,
    NavBarModule,
    LoginModule,
    CompartilhadoModule,

    TabMenuModule
  ],
  declarations: [AdministradorHomeComponent, UsuarioHomeComponent, PrestadorHomeComponent]
})
export class HomeModule { }
