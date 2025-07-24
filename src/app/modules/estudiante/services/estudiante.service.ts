// src/app/modules/estudiante/services/estudiante.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Curso {
  id: number;
  codigo: string;
  titulo: string;
  profesor: string;
  progreso: number;
  imagen: string;
  ultimoAcceso: string;
  tareasPendientes: number;
  creditos: number;
  periodo: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = `http://localhost:3000/api`;

  constructor(private http: HttpClient) {}

  getCursosDisponibles(estudianteId: number = 1): Observable<{success: boolean; data: Curso[]}> {
    return this.http.get<{success: boolean; data: Curso[]}>(
      `${this.apiUrl}/mis-cursos?estudianteId=${estudianteId}`
    );
  }

  getDetallesCompletosCurso(cursoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos/${cursoId}/detalles`);
  }
}
