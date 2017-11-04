import { BuscaDialogModule } from './../busca-dialog/busca-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioNavComponent } from './usuario/usuario-nav.component';
import { PrestadorNavComponent } from './prestador/prestador-nav.component';
import { AdministradorNavComponent } from './administrador/administrador-nav.component';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule, InputTextModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BuscaDialogModule,

    ButtonModule,
    InputTextModule
  ],
  declarations: [
    UsuarioNavComponent,
    AdministradorNavComponent,
    PrestadorNavComponent
  ],
  exports: [
    UsuarioNavComponent,
    AdministradorNavComponent,
    PrestadorNavComponent
  ]
})
export class NavBarModule { }
