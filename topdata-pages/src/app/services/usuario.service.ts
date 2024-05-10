import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/users';
  private loginUrl = 'http://localhost:8080/login'

  constructor( private http: HttpClient ) { }

  listarUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  usuarioById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  registerUser(user: User): Observable<any>{
    const url = `${this.apiUrl}`;
    return this.http.post<User>(url, user);
  }

  updateUser(user: User): Observable<any>{
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  login(email: string, password: string): Observable<User>{
    const dados = {email, password};
    return this.http.post<User>(this.loginUrl, dados);
  }
}
