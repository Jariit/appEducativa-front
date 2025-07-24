// modulo-detalle.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modulo-detalle',
  templateUrl: './modulo-detalle.component.html',
  styleUrls: ['./modulo-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ModuloDetalleComponent {
  modules = [
    // Módulos de Matemáticas Avanzadas
    {
      id: 1,
      title: 'Álgebra Lineal',
      description: 'Este módulo cubre los conceptos fundamentales de vectores, matrices y transformaciones lineales, con aplicaciones prácticas en diversos campos.',
      course: 'Matemáticas Avanzadas',
      courseId: 1,
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
    },
    {
      id: 2,
      title: 'Cálculo Diferencial',
      description: 'Exploración de límites, derivadas y sus aplicaciones en problemas del mundo real.',
      course: 'Matemáticas Avanzadas',
      courseId: 1,
      progress: 40,
      activities: [
        {
          id: 5,
          title: 'Introducción a límites',
          type: 'lecture',
          duration: '35 min',
          completed: true,
          resources: 2
        },
        {
          id: 6,
          title: 'Definición de derivada',
          type: 'lecture',
          duration: '40 min',
          completed: true,
          resources: 3
        },
        {
          id: 7,
          title: 'Ejercicios de derivación',
          type: 'assignment',
          dueDate: '2023-12-18',
          completed: false
        },
        {
          id: 8,
          title: 'Aplicaciones de derivadas',
          type: 'lecture',
          duration: '50 min',
          completed: false,
          resources: 4
        }
      ]
    },
    // Módulos de Programación en JavaScript
    {
      id: 3,
      title: 'Fundamentos de JavaScript',
      description: 'Sintaxis básica, variables, tipos de datos y estructuras de control fundamentales.',
      course: 'Programación en JavaScript',
      courseId: 2,
      progress: 100,
      activities: [
        {
          id: 9,
          title: 'Introducción a JavaScript',
          type: 'lecture',
          duration: '25 min',
          completed: true,
          resources: 2
        },
        {
          id: 10,
          title: 'Variables y tipos de datos',
          type: 'lecture',
          duration: '30 min',
          completed: true,
          resources: 3
        },
        {
          id: 11,
          title: 'Ejercicios de práctica',
          type: 'assignment',
          dueDate: '2023-12-10',
          completed: true,
          score: 88
        }
      ]
    },
    {
      id: 4,
      title: 'Funciones y Scope',
      description: 'Aprende sobre funciones, closures y el ámbito de variables en JavaScript.',
      course: 'Programación en JavaScript',
      courseId: 2,
      progress: 50,
      activities: [
        {
          id: 12,
          title: 'Declaración de funciones',
          type: 'lecture',
          duration: '35 min',
          completed: true,
          resources: 2
        },
        {
          id: 13,
          title: 'Arrow functions',
          type: 'lecture',
          duration: '20 min',
          completed: true,
          resources: 1
        },
        {
          id: 14,
          title: 'Ejercicio de funciones',
          type: 'assignment',
          dueDate: '2023-12-17',
          completed: false
        },
        {
          id: 15,
          title: 'Closures y scope',
          type: 'lecture',
          duration: '40 min',
          completed: false,
          resources: 3
        }
      ]
    }
  ];

  module: any;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const moduleId = +params['id'];
      this.module = this.modules.find(m => m.id === moduleId);
    });
  }

  getActivityIcon(type: string): string {
    switch(type) {
      case 'lecture': return 'book-outline';
      case 'assignment': return 'document-text-outline';
      case 'project': return 'cube-outline';
      case 'quiz': return 'help-circle-outline';
      default: return 'ellipse-outline';
    }
  }

  formatDueDate(dateString: string | undefined): string {
    if (!dateString) return 'Sin fecha definida';
    return new Date(dateString).toLocaleDateString();
  }

  calcularTiempoModulo(): string {
    if (!this.module) return '';
    const actividades = this.module.activities.length;
    const completadas = this.module.activities.filter((a: any) => a.completed).length;
    const estimado = actividades * 30; // 30 min por actividad

    if (completadas === actividades) {
      return 'Completado';
    } else if (completadas === 0) {
      return `~${Math.ceil(estimado / 60)} horas estimadas`;
    } else {
      const restante = Math.ceil((estimado * (actividades - completadas)) / actividades / 60);
      return `~${restante} horas restantes`;
    }
  }

  compartirModulo() {
    // Lógica para compartir el módulo
    console.log('Compartiendo módulo:', this.module.title);
  }
}
