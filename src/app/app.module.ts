import { AuthGuard } from './compartilhado/guard/auth.guard';
import { GlobalService } from './compartilhado/services/global.service';
import { BuscaTextoModule } from './busca-texto/busca-texto.module';
import { BuscaDialogModule } from './busca-dialog/busca-dialog.module';
import { PerfilModule } from './perfil/perfil.module';
import { CompartilhadoModule } from './compartilhado/compartilhado.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { LoginModule } from './login/login.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { ServicosModule } from './servicos/servicos.module';
import { PrestadorSolitacoesComponent } from './prestador-solitacoes/prestador-solitacoes.component';


@NgModule({
  declarations: [
    AppComponent,
    PrestadorSolitacoesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpModule,

    AppRoutingModule,
    CadastroModule,
    BuscaDialogModule,
    BuscaTextoModule,
    HomeModule,
    NavBarModule,
    LoginModule,
    CompartilhadoModule,
    ServicosModule,
    PerfilModule
  ],
  providers: [GlobalService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
