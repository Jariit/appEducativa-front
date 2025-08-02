// profesor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:3000/api/profesor';

  constructor(private http: HttpClient) { }

  descargarArchivo(tipo: string, nombreArchivo: string): Observable<any> {
    const tipoNormalizado = tipo === 'materials' ? 'materiales' : tipo;
    const url = `${this.apiUrl}/descargar/${tipoNormalizado}/${encodeURIComponent(nombreArchivo)}`;

    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Blob) {
          // Convertir Blob de error a JSON
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const errorObj = JSON.parse(reader.result as string);
                reject(errorObj);
              } catch (e) {
                reject({
                  message: 'Error al procesar la respuesta del servidor',
                  originalError: error
                });
              }
            };
            reader.readAsText(error.error);
          });
        }
        return throwError(() => error);
      })
    );
  }
}
