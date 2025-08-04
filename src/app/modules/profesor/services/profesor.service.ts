import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  descargarArchivo(tipo: string, nombreArchivo: string, previsualizar: boolean = false): Observable<any> {
    // Validaciones
    const tiposValidos = ['materiales', 'entregas'];
    if (!tiposValidos.includes(tipo.toLowerCase())) {
      return throwError(() => new Error(`Tipo de archivo no válido. Tipos permitidos: ${tiposValidos.join(', ')}`));
    }

    if (!nombreArchivo || typeof nombreArchivo !== 'string') {
      return throwError(() => new Error('Nombre de archivo no válido'));
    }

    const endpoint = previsualizar ? 'ver' : 'descargar';
    const url = `${this.apiUrl}/archivos/${endpoint}/${tipo}/${encodeURIComponent(nombreArchivo)}`;

    if (previsualizar) {
      // Abrir en nueva pestaña
      window.open(url, '_blank');
      return new Observable(observer => {
        observer.next({ success: true });
        observer.complete();
      });
    } else {
      // Configuración para descarga directa
      return this.http.get(url, {
        responseType: 'blob',
        observe: 'response'
      }).pipe(
        catchError(this.handleDownloadError)
      );
    }
  }

  private handleDownloadError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error al descargar el archivo';

    if (error.status === 0) {
      errorMessage = 'No se pudo conectar al servidor. Verifique su conexión a internet.';
    } else if (error.status === 404) {
      errorMessage = 'El archivo solicitado no existe en el servidor.';
      console.error('Ruta no encontrada:', error.url);
    } else if (error.status === 403) {
      errorMessage = 'No tiene permisos para acceder a este archivo.';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor al procesar la solicitud.';
    }

    console.error('Detalles del error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
