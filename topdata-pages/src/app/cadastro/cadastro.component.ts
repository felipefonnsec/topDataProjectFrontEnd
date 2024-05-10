import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  user: any = {};
  username!: string;
  email!: string;
  password!: string;
  message: string = '';

    constructor(
      private router: Router,
      private usuarioService: UsuarioService
    ){}

    cadastrar(){
      if (!this.user.name || !this.user.email || !this.user.password) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      this.usuarioService.registerUser(this.user).subscribe(
        response => {
          console.log('salvo com sucesso', response);
        }, error => {
            console.log('erro ao salvar', error)
        }
      )
    }

    voltar(){
      this.router.navigate(['']);
    }
}
