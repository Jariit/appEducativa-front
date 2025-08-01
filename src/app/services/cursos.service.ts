import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCursosEstudiante(estudianteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiante/${estudianteId}/cursos`);
  }

  getCursosProfesor(profesorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/profesor/${profesorId}/cursos`);
  }

  crearCurso(cursoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profesor/cursos`, cursoData);
  }
}
