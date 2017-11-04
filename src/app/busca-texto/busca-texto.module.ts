import { BuscaTextoComponent } from './busca-texto.component';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaAdministradorComponent } from './busca-administrador/busca-administrador.component';
import { BuscaUsuarioComponent } from './busca-usuario/busca-usuario.component';
import { BuscaPrestadorComponent } from './busca-prestador/busca-prestador.component';

@NgModule({
  imports: [
    CommonModule,
    NavBarModule
  ],
  declarations: [BuscaTextoComponent, BuscaAdministradorComponent, BuscaUsuarioComponent, BuscaPrestadorComponent]
})
export class BuscaTextoModule { }
