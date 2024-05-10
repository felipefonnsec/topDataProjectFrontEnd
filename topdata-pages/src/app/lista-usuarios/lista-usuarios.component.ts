import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
[x: string]: any;
  usuarios: User[] = [];
  usuariosFiltrados: User[] = [];
  filtroNome: string = '';
  filtroEmail: string = '';
  page = 1;
  pageSize = 5;
  pageUsers!: User[];
  pages: number[] = [];
  selectedUser!: User;
  user!: number;

  @ViewChild('userDetailsModal') userDetailsModal: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.listarUsuario();
    this.usuariosFiltrados = this.usuarios;
  }

  applyFilters(){
    if(!this.filtroNome && !this.filtroEmail){
      this.usuariosFiltrados = this.usuarios
    }

    this.usuariosFiltrados = this.usuarios.filter( user =>
      user.name.toLowerCase().includes(this.filtroNome.toLowerCase()) &&
      user.email.toLowerCase().includes(this.filtroEmail.toLowerCase())
    );
  }

  listarUsuario(){
    this.usuarioService.listarUsuarios()
      .subscribe(usuario => {
        this.usuarios = usuario;
        this.user = this.usuarios.length;
        this.setPage(1);
      })
  }

  showDetails(usuario: User){
   this.router.navigate(['/users', usuario.id])
  }

  setPage(page: number){
    this.page = page;
    this.pageUsers = this.usuarios.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  paginaSelecionada(){}

  exit(){
    this.router.navigate([''])
  }
}
