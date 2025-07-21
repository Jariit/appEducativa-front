// curso-detalle.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class CursoDetalleComponent {
  course = {
    id: 1,
    title: 'Matemáticas Avanzadas',
    description: 'Este curso cubre los conceptos fundamentales de matemáticas avanzadas necesarios para el desarrollo de habilidades analíticas y de resolución de problemas complejos.',
    teacher: 'Prof. García',
    schedule: 'Lunes y Miércoles 14:00 - 16:00',
    progress: 65,
    modules: [
      {
        id: 1,
        title: 'Álgebra Lineal',
        description: 'Vectores, matrices y transformaciones lineales',
        completed: true,
        activities: 4,
        completedActivities: 4
      },
      {
        id: 2,
        title: 'Cálculo Diferencial',
        description: 'Límites, derivadas y aplicaciones',
        completed: false,
        activities: 5,
        completedActivities: 2
      }
    ]
  };

  // Método para calcular el progreso de un módulo
  calculateModuleProgress(module: any): number {
    return (module.completedActivities / module.activities) * 100;
  }
}
