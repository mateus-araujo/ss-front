import { MenuItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  items: MenuItem[];
  
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Adicionar categoria'},
      {label: 'Adicionar servico'},
      {label: 'Listar'},
      {label: 'Aprovar'},
      {label: 'Relatório de busca'},
      {label: 'Adcionar Plano'},
    ];
  }

}
