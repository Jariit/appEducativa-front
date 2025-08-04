import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  success: boolean;
  user: any;
  message?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  public redirectUrl?: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.success) {
          // Guardar token y datos de usuario en localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

   logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

// auth.service.ts
// Actualiza el método getCurrentUser
 getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

getRoleName(roleId: number): string {
  const roleMappings: {[key: number]: string} = {
    1: 'Estudiante',
    2: 'Profesor',
    3: 'Administrador'
  };

  return roleMappings[roleId] || 'Invitado';
}

   isStudent(): boolean {
    return localStorage.getItem('userType') === 'student';
  }

  isTeacher(): boolean {
    return localStorage.getItem('userType') === 'teacher';
  }
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.rol_id === 3; // ID del rol admin
  }

  // En auth.service.ts
hasRole(userRoleId: number, requiredRole: string): boolean {
  const roleMappings: {[key: string]: number} = {
    'estudiante': 1,
    'profesor': 2,
    'admin': 3
  };
  return userRoleId === roleMappings[requiredRole];
}

getHomeForRole(roleId: number): string {
  switch(roleId) {
    case 1: return '/estudiante/inicio';
    case 2: return '/profesor/dashboard';
    case 3: return '/admin/panel';
    default: return '/auth/login';
  }
}
}
