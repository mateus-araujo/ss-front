import { ServicosComponent } from './servicos/servicos.component';
import { PrestadorCadastroComponent } from './cadastro/prestador/prestador-cadastro.component';
import { PrestadorLoginComponent } from './login/prestador/prestador-login.component';
import { PrestadorHomeComponent } from './home/prestador/prestador-home.component';
import { UsuarioCadastroComponent } from './cadastro/usuario/usuario-cadastro.component';
import { AdministradorCadastroComponent } from './cadastro/administrador/administrador-cadastro.component';
import { UsuarioLoginComponent } from './login/usuario/usuario-login.component';
import { AdministradorLoginComponent } from './login/administrador/administrador-login.component';
import { AdministradorHomeComponent } from './home/administrador/administrador-home.component';
import { UsuarioHomeComponent } from './home/usuario/usuario-home.component';
import { BuscaComponent } from './busca/busca.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { path: 'home/user', component: UsuarioHomeComponent },
  { path: 'home/user/login', component: UsuarioLoginComponent },
  { path: 'home/user/cadastro', component: UsuarioCadastroComponent },

  { path: 'home/prestador', component: PrestadorHomeComponent },
  { path: 'home/prestador/login', component: PrestadorLoginComponent },
  { path: 'home/prestador/cadastro', component: PrestadorCadastroComponent },

  { path: 'home/admin', component: AdministradorHomeComponent },
  { path: 'home/admin/login', component: AdministradorLoginComponent },
  { path: 'home/admin/cadastro', component: AdministradorCadastroComponent },
  { path: 'home/admin/servicos', component: ServicosComponent },

  { path: '', redirectTo: '/home/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/home/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
