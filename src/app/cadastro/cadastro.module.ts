import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { DropdownService } from './../compartilhado/services/dropdown.service';
import { PrestadorCadastroComponent } from './prestador/prestador-cadastro.component';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule, ButtonModule, CalendarModule, CodeHighlighterModule, 
  ConfirmDialogModule, ConfirmationService, DataTableModule, 
  DropdownModule, EditorModule, FieldsetModule, GrowlModule, 
  InputMaskModule, InputSwitchModule, InputTextareaModule, InputTextModule,
  MenubarModule, MenuItem, MenuModule, PanelModule, PasswordModule, 
  PickListModule, RadioButtonModule, TabViewModule } from 'primeng/primeng';

import { CadastroComponent } from './cadastro.component';
import { PFisicaComponent } from './pfisica/pfisica.component';
import { PJuridicaComponent } from './pjuridica/pjuridica.component';
import { UsuarioCadastroComponent } from './usuario/usuario-cadastro.component';
import { AdministradorCadastroComponent } from './administrador/administrador-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NavBarModule,
    ReactiveFormsModule,
    CompartilhadoModule,

    AutoCompleteModule,
    ButtonModule, 
    CalendarModule, 
    CodeHighlighterModule, 
    ConfirmDialogModule, 
    DataTableModule, 
    DropdownModule, 
    EditorModule, 
    FieldsetModule, 
    GrowlModule, 
    InputMaskModule, 
    InputSwitchModule, 
    InputTextareaModule, 
    InputTextModule,
    MenubarModule,
    MenuModule, 
    PanelModule, 
    PasswordModule, 
    PickListModule, 
    RadioButtonModule, 
    TabViewModule
  ],
  declarations: [
    CadastroComponent,
    PFisicaComponent,
    PJuridicaComponent,
    UsuarioCadastroComponent,
    AdministradorCadastroComponent,
    PrestadorCadastroComponent
  ],
  providers: [ DropdownService ]
})
export class CadastroModule { }
