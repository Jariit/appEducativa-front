import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/api/cursos';

  constructor(private http: HttpClient) {}

  // Para estudiantes
  getCursosEstudiante(estudianteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiante/${estudianteId}`);
  }

  // Para profesores
  getCursosProfesor(profesorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/profesor/${profesorId}`);
  }

  getDetalleCurso(cursoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cursoId}`);
  }

  crearCurso(cursoData: any): Observable<any> {
    return this.http.post(this.apiUrl, cursoData);
  }

  actualizarCurso(cursoId: number, cursoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cursoId}`, cursoData);
  }
}
