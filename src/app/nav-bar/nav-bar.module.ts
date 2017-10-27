import { PrestadorNavComponent } from './prestador/prestador-nav.component';
import { AdministradorNavComponent } from './administrador/administrador-nav.component';
import { BuscaModule } from './../busca/busca.module';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioNavComponent } from './usuario/usuario-nav.component';

import { ButtonModule, InputTextModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    BuscaModule,
    AppRoutingModule,

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
