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
  // Datos de ejemplo - en una app real vendrían de un servicio
  courses = [
    {
      id: 1,
      title: 'Matemáticas Avanzadas',
      teacher: 'Prof. García',
      progress: 65,
      image: '../../../../../assets/advanced-math-formulas-on-seamless-260nw-2500229937.webp',
      lastAccessed: '2023-11-20',
      pendingTasks: 2
    },
    {
      id: 2,
      title: 'Programación en JavaScript',
      teacher: 'Prof. Martínez',
      progress: 30,
      image: '../../../../../assets/Unofficial_JavaScript_logo_2.svg.png',
      lastAccessed: '2023-11-18',
      pendingTasks: 4
    }
  ];

  // Método para formatear la fecha
  formatLastAccessed(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
