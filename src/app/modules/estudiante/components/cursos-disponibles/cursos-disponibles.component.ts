// cursos-disponibles.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-cursos-disponibles',
  templateUrl: './cursos-disponibles.component.html',
  styleUrls: ['./cursos-disponibles.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, SharedModule]
})
export class CursosDisponiblesComponent {
  // Cambiado de 'courses' a 'cursos' para mantener consistencia con español
  cursos = [
    {
      id: 1,
      titulo: 'Matemáticas Avanzadas',
      profesor: 'Prof. García',
      progreso: 65,
      imagen: '../../../../../assets/advanced-math-formulas-on-seamless-260nw-2500229937.webp',
      ultimoAcceso: '2023-11-20',
      tareasPendientes: 2
    },
    {
      id: 2,
      titulo: 'Programación en JavaScript',
      profesor: 'Prof. Martínez',
      progreso: 30,
      imagen: '../../../../../assets/Unofficial_JavaScript_logo_2.svg.png',
      ultimoAcceso: '2023-11-18',
      tareasPendientes: 4
    }
  ];

  // Método para calcular el progreso total (promedio)
  totalProgreso(): number {
    if (this.cursos.length === 0) return 0;
    const total = this.cursos.reduce((sum, curso) => sum + curso.progreso, 0);
    return Math.round(total / this.cursos.length);
  }

  // Método para calcular tareas pendientes totales
  tareasPendientes(): number {
    return this.cursos.reduce((sum, curso) => sum + curso.tareasPendientes, 0);
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
}
