import { Http } from '@angular/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-usuario',
  templateUrl: './usuario-nav.component.html',
  styleUrls: ['./usuario-nav.component.css',
              '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class UsuarioNavComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: Http) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      campoBusca: [null]
    });
  }

  buscar() {
    console.log(this.formulario.value);
  }

}
