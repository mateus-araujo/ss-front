import { Message, ConfirmationService } from 'primeng/primeng';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prestador-perfil',
  templateUrl: './prestador-perfil.component.html',
  styleUrls: ['./prestador-perfil.component.css']
})
export class PrestadorPerfilComponent implements OnInit {

  formulario: FormGroup;
  msgs: Message[] = [];
  
  constructor(
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      pergunta: [null]
    });
  }

  enviarPergunta() {
    console.log(this.formulario.value);
  }

  voltar() {

  }

  contratar() {
    this.confirmationService.confirm({
      message: 'Você deseja contratar esse profissional?',
      accept: () => {
        // Actual logic to perform a confirmation
      }
    });
  }
}
