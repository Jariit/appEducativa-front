// profesor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',

})
export class ProfesorService {
  constructor(private http: HttpClient) {}

  getTareasPendientes() {
    return this.http.get('/api/tareas/pendientes');
  }

  getResultadosTests() {
    return this.http.get('/api/tests/resultados');
  }

  calificarTarea(tareaId: number, calificacion: number, comentario: string) {
    return this.http.post('/api/tareas/calificar', {
      tareaId,
      calificacion,
      comentario
    });
  }
}
