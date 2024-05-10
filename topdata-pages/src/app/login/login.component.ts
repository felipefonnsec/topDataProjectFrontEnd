import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    private loginUrl = 'http://localhost:8080/login'

    constructor(
      private router: Router,
      private usuarioService: UsuarioService,
      private http: HttpClient
    ){}

    login(){
      if(!this.email || !this.password){
        alert('Por favor preencha todos os campos')
        return;
      }

      this.usuarioService.login(this.email, this.password).subscribe(
        (response: any) => {
          console.log('Login bem sucedido:', response);
          this.router.navigate(['/lista-usuarios'])
        }, error => {
          console.error('Erro ao fazer login:', error);
          alert('Dados inválidas. Por favor, tente novamente.');
        })
    }

    cadastro(){
      this.router.navigate(['/cadastro']);
    }
}
