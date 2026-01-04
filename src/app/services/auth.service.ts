import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private http = inject(HttpClient);
  private router = inject(Router);

  // BehaviorSubject para que la app reaccione al login/logout
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_role'));
  public userRole$ = this.userRoleSubject.asObservable();

  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.API_URL}/login`, { username, password }).pipe(
    tap(res => {
      // 1. Usar 'jwt' porque así lo llama tu Backend
      localStorage.setItem('auth_token', res.jwt);
      
      // 2. Extraer el rol del array (asumiendo que viene como ['ADMINISTRADOR'])
      const role = res.roles && res.roles.length > 0 ? res.roles[0] : null;
      
      if (role) {
        localStorage.setItem('user_role', role);
        // 3. Notificamos el cambio para que el menú reaccione
        this.userRoleSubject.next(role);
      }
      
      this.router.navigate(['/']);
    })
  );
}

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    this.userRoleSubject.next(null);
    this.router.navigate(['/acceso-miembros']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');
  }
}
