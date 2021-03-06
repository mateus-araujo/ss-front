import { CrudComponent } from './crud-categoria-servico/crud.component';
import { CategoriaServicoService } from './../compartilhado/services/categoria-servico.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompartilhadoModule } from './../compartilhado/compartilhado.module';
import { HttpModule } from '@angular/http';
import { CadastroModule } from './../cadastro/cadastro.module';
import { NavBarModule } from './../nav-bar/nav-bar.module';
import { ServicosComponent } from './servicos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AutoCompleteModule, ButtonModule, DialogModule, CalendarModule, CodeHighlighterModule,
  ConfirmDialogModule, ConfirmationService, DataTableModule,
  DropdownModule, EditorModule, FieldsetModule, GrowlModule,
  InputMaskModule, InputSwitchModule, InputTextareaModule, InputTextModule,
  MenubarModule, MenuItem, MenuModule, PanelModule, PasswordModule,
  PickListModule, RadioButtonModule, SharedModule, TabMenuModule, TabViewModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NavBarModule,

    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    DataTableModule,
    DialogModule,
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
    SharedModule,
    CompartilhadoModule,
    TabMenuModule,
    TabViewModule
  ],
  providers: [ ConfirmationService ],
  declarations: [ServicosComponent, CrudComponent]
})
export class ServicosModule { }
