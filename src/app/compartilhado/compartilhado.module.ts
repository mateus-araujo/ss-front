import { UsuarioService } from './services/usuario.service';
import { PlanosService } from './services/planos.service';
import { CategoriaServicoService } from './services/categoria-servico.service';
import { HttpModule } from '@angular/http';
import { DropdownService } from './services/dropdown.service';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error-component/error.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    FormDebugComponent,
    ErrorComponent
  ],
  exports: [
    FormDebugComponent,
    ErrorComponent
  ],
  providers: [
    CategoriaServicoService,
    DropdownService,
    PlanosService,
    UsuarioService]
})
export class CompartilhadoModule { }
