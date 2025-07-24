// curso-detalle.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class CursoDetalleComponent {
  cursos = [
    {
      id: 1,
      titulo: 'Matemáticas Avanzadas',
      descripcion: 'Este curso cubre los conceptos fundamentales de matemáticas avanzadas necesarios para el desarrollo de habilidades analíticas y de resolución de problemas complejos. Aprenderás desde álgebra lineal hasta cálculo multivariable.',
      profesor: 'Dr. Carlos García',
      horario: 'Lunes y Miércoles 14:00 - 16:00',
      duracion: 8,
      nivel: 'Intermedio - Avanzado',
      progreso: 65,
      imagen: ',./../../../../../../assets/advanced-math-formulas-on-seamless-260nw-2500229937.webp',
      modulos: [
        {
          id: 1,
          titulo: 'Álgebra Lineal',
          descripcion: 'Vectores, matrices y transformaciones lineales',
          completado: true,
          actividades: 4,
          actividadesCompletadas: 4
        },
        {
          id: 2,
          titulo: 'Cálculo Diferencial',
          descripcion: 'Límites, derivadas y aplicaciones',
          completado: false,
          actividades: 5,
          actividadesCompletadas: 2
        }
      ]
    },
    {
      id: 2,
      titulo: 'Programación en JavaScript',
      descripcion: 'Aprende los fundamentos de JavaScript, el lenguaje de programación más importante para desarrollo web, incluyendo ES6+ y conceptos avanzados como asincronía y programación funcional.',
      profesor: 'Ing. Laura Martínez',
      horario: 'Martes y Jueves 16:00 - 18:00',
      duracion: 6,
      nivel: 'Principiante - Intermedio',
      progreso: 30,
      imagen: '../../../../../assets/Unofficial_JavaScript_logo_2.svg.png',
      modulos: [
        {
          id: 3,
          titulo: 'Fundamentos de JavaScript',
          descripcion: 'Sintaxis básica, variables y tipos de datos',
          completado: true,
          actividades: 3,
          actividadesCompletadas: 3
        },
        {
          id: 4,
          titulo: 'Funciones y Scope',
          descripcion: 'Funciones, closures y ámbito de variables',
          completado: false,
          actividades: 4,
          actividadesCompletadas: 2
        }
      ]
    }
  ];

  curso: any;

  constructor(private rutaActiva: ActivatedRoute) {
    this.rutaActiva.params.subscribe(params => {
      const idCurso = +params['id'];
      this.curso = this.cursos.find(c => c.id === idCurso);
    });
  }

  calcularProgresoModulo(modulo: any): number {
    return (modulo.actividadesCompletadas / modulo.actividades) * 100;
  }

  calcularTiempoRestante(): string {
    if (!this.curso?.progreso || !this.curso?.duracion) return '';
    const semanasCompletadas = (this.curso.progreso / 100) * this.curso.duracion;
    const semanasRestantes = Math.ceil(this.curso.duracion - semanasCompletadas);
    return `${semanasRestantes} ${semanasRestantes === 1 ? 'semana' : 'semanas'}`;
  }

  compartirCurso() {
    // Lógica para compartir el curso
    console.log('Compartiendo curso:', this.curso.titulo);
  }
}
