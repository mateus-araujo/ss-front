import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { PrestadorPerfilComponent } from './prestador/prestador-perfil.component';
import { UsuarioPerfilComponent } from './usuario/usuario-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule, ConfirmDialogModule, ConfirmationService,
  InputTextModule, GrowlModule, RatingModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    NavBarModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    GrowlModule,
    RatingModule,

  ],
  declarations: [UsuarioPerfilComponent, PrestadorPerfilComponent]
})
export class PerfilModule { }
