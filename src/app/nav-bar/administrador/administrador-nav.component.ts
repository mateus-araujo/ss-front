import { Http } from '@angular/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-administrador',
  templateUrl: './administrador-nav.component.html',
  styleUrls: ['./administrador-nav.component.css',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AdministradorNavComponent implements OnInit {

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
