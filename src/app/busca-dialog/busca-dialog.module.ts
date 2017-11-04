import { BuscaDialogComponent } from './busca-dialog.component';
import { BuscaTextoComponent } from './../busca-texto/busca-texto.component';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { BuscaService } from './../compartilhado/services/busca.service';
import { CategoriaServicoService } from './../compartilhado/services/categoria-servico.service';
import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule, InputTextModule, ButtonModule, DialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompartilhadoModule,

    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [CategoriaServicoService, BuscaService],
  declarations: [BuscaDialogComponent],
  exports: [BuscaDialogComponent]
})
export class BuscaDialogModule { }
