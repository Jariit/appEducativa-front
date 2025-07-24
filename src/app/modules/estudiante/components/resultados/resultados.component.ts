// resultados.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ResultadosComponent {
  // Datos de ejemplo - en una app real vendrían de un servicio
  resultados = [
    {
      curso: 'Matemáticas Avanzadas',
      puntuacion: 85,
      fecha: '2023-11-20',
      profesor: 'Prof. García',
      modulos: [
        { nombre: 'Álgebra Lineal', puntuacion: 90 },
        { nombre: 'Cálculo Diferencial', puntuacion: 80 }
      ]
    },
    {
      curso: 'Programación JavaScript',
      puntuacion: 92,
      fecha: '2023-10-15',
      profesor: 'Prof. Martínez',
      modulos: [
        { nombre: 'Fundamentos', puntuacion: 95 },
        { nombre: 'Funciones', puntuacion: 89 }
      ]
    }
  ];

  // Método para calcular el promedio general
  promedioGeneral(): number {
    if (this.resultados.length === 0) return 0;
    const total = this.resultados.reduce((sum, resultado) => sum + resultado.puntuacion, 0);
    return Math.round(total / this.resultados.length);
  }

  // Método para obtener el mejor curso
  mejorCurso(): any {
    if (this.resultados.length === 0) return null;
    return this.resultados.reduce((prev, current) =>
      (prev.puntuacion > current.puntuacion) ? prev : current);
  }

  // Método para contar cursos evaluados
  totalCursos(): number {
    return this.resultados.length;
  }

  // Método para formatear la fecha
  formatearFecha(fechaString: string): string {
    const opciones: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
  }

  // Método para determinar el color según la puntuación
  obtenerColorPuntuacion(puntuacion: number): string {
    if (puntuacion >= 90) return 'success';
    if (puntuacion >= 70) return 'primary';
    return 'danger';
  }
}
