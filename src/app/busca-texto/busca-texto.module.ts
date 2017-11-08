import { NavBarModule } from './../nav-bar/nav-bar.module';
import { BuscaPrestadorComponent } from './prestador/busca-prestador.component';
import { BuscaUsuarioComponent } from './usuario/busca-usuario.component';
import { BuscaAdministradorComponent } from './administrador/busca-administrador.component';
import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { ButtonModule, InputTextModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscaTextoComponent } from './busca-texto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule,
    FormsModule,
    ReactiveFormsModule,
    NavBarModule,

    ButtonModule,
    InputTextModule
  ],
  declarations: [BuscaTextoComponent, BuscaAdministradorComponent, BuscaUsuarioComponent, BuscaPrestadorComponent],
  exports: [BuscaTextoComponent]
})
export class BuscaTextoModule { }
