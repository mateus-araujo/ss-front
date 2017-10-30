import { CategoriaServicoService } from './../compartilhado/services/categoria-servico.service';
import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscaComponent } from './busca.component';
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
  providers: [CategoriaServicoService],
  declarations: [ BuscaComponent ],
  exports: [ BuscaComponent ]
})
export class BuscaModule { }
