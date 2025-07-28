// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  getProfile(userId: number) {
  return this.http.get<any>(`${this.apiUrl}/profile`, {
    params: { id: userId.toString() }
  }).pipe(
    catchError(error => {
      console.error('Error en UserService:', error);
      return throwError(() => new Error('Error al obtener perfil'));
    })
  );
}
}
