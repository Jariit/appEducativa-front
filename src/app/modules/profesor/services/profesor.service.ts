import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'https://tu-api.com/profesor';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cursos`);
  }

  getModulos(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cursos/${cursoId}/modulos`);
  }

  getActividades(moduloId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modulos/${moduloId}/actividades`);
  }

  getDetalleActividad(actividadId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/actividades/${actividadId}`);
  }

  getEntregasActividad(actividadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actividades/${actividadId}/entregas`);
  }

  calificarActividad(actividadId: number, estudianteId: number, calificacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/actividades/${actividadId}/calificar`, {
      estudianteId,
      ...calificacion
    });
  }

  descargarArchivo(actividadId: number, archivoNombre: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/actividades/${actividadId}/archivos/${archivoNombre}`, {
      responseType: 'blob'
    });
  }
}
