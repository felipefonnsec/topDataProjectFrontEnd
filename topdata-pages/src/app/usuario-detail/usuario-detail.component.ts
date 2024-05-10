import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UsuarioService } from '../services/usuario.service';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrl: './usuario-detail.component.css'
})
export class UsuarioDetailComponent implements OnInit{
  user!: User;
  isSaving: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ){}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as any;
    this.usuarioService.usuarioById(id).subscribe(user => {
      this.user = user;
    });
  }

  saveUser(){
    if(!this.user.name || !this.user.email || !this.user.password){
      alert('Os campos precisam estar preenchidos corretamente')
    }

    this.isSaving = true;

    this.usuarioService.updateUser(this.user).subscribe(() => {
       alert('Usuario salvo com sucesso')
       this.router.navigate(['/lista-usuarios']);
    }, error => {
       console.error('Erro ao atualizar usuário:', error);
       this.isSaving = false;
    })
  }

  voltar(){
    this.router.navigate(['/lista-usuarios'])
  }
}
