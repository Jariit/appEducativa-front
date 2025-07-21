// modulo-detalle.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modulo-detalle',
  templateUrl: './modulo-detalle.component.html',
  styleUrls: ['./modulo-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ModuloDetalleComponent {
  module = {
    id: 1,
    title: 'Álgebra Lineal',
    description: 'Este módulo cubre los conceptos fundamentales de vectores, matrices y transformaciones lineales, con aplicaciones prácticas en diversos campos.',
    course: 'Matemáticas Avanzadas',
    progress: 100,
    activities: [
      {
        id: 1,
        title: 'Introducción a vectores',
        type: 'lecture',
        duration: '30 min',
        completed: true,
        resources: 3
      },
      {
        id: 2,
        title: 'Ejercicios prácticos',
        type: 'assignment',
        dueDate: '2023-12-15',
        completed: true,
        score: 95
      },
      {
        id: 3,
        title: 'Matrices y determinantes',
        type: 'lecture',
        duration: '45 min',
        completed: true,
        resources: 2
      },
      {
        id: 4,
        title: 'Proyecto final',
        type: 'project',
        dueDate: '2023-12-20',
        completed: true,
        score: 90
      }
    ]
  };



  // modulo-detalle.component.ts
getActivityIcon(type: string): string {
  switch(type) {
    case 'lecture': return 'book-outline';
    case 'assignment': return 'document-text-outline';
    case 'project': return 'cube-outline';
    case 'quiz': return 'help-circle-outline';
    default: return 'ellipse-outline';
  }
}
// modulo-detalle.component.ts
formatDueDate(dateString: string | undefined): string {
  if (!dateString) return 'Sin fecha definida';
  return new Date(dateString).toLocaleDateString();
}
}
