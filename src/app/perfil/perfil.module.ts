import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { PerfilAdministradorComponent } from './administrador/perfil-administrador.component';
import { PerfilComponent } from './perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { PrestadorPerfilComponent } from './prestador/prestador-perfil.component';
import { UsuarioPerfilComponent } from './usuario/usuario-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule, ConfirmDialogModule, DialogModule, ConfirmationService,
  InputTextModule, GrowlModule, RatingModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule,
    NavBarModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    GrowlModule,
    RatingModule,
  ],
  declarations: [UsuarioPerfilComponent, PrestadorPerfilComponent, PerfilComponent, PerfilAdministradorComponent],
  exports: [PerfilComponent]
})
export class PerfilModule { }
