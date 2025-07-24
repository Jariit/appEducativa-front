import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  imagen?: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activo' | 'inactivo';
  estudiantes: number[];
  modulos?: Modulo[];
}

interface Modulo {
  id: number;
  titulo: string;
  descripcion: string;
  orden: number;
  actividades: Actividad[];
}

interface Actividad {
  id: number;
  titulo: string;
  tipo: 'lectura' | 'tarea' | 'examen' | 'proyecto';
  descripcion: string;
  fechaLimite?: string;
  completada?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private cursos$ = new BehaviorSubject<Curso[]>([
    {
      id: 1,
      titulo: 'Matemáticas Avanzadas',
      descripcion: 'Curso de matemáticas para nivel universitario',
      imagen: 'assets/math.jpg',
      fechaInicio: '2023-09-01',
      fechaFin: '2023-12-15',
      estado: 'activo',
      estudiantes: [101, 102],
      modulos: [
        {
          id: 1,
          titulo: 'Álgebra Lineal',
          descripcion: 'Fundamentos de álgebra',
          orden: 1,
          actividades: [
            {
              id: 1,
              titulo: 'Introducción a vectores',
              tipo: 'lectura',
              descripcion: 'Conceptos básicos',
              completada: true
            }
          ]
        }
      ]
    }
  ]);

  getCursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  addCurso(curso: Omit<Curso, 'id' | 'estado' | 'estudiantes' | 'modulos'>): void {
    const newCourse: Curso = {
      ...curso,
      id: Date.now(),
      estado: 'activo',
      estudiantes: [],
      modulos: []
    };
    this.cursos$.next([...this.cursos$.value, newCourse]);
  }

  addModulo(cursoId: number, modulo: Omit<Modulo, 'id' | 'actividades'>): void {
    const courses = [...this.cursos$.value];
    const courseIndex = courses.findIndex(c => c.id === cursoId);

    if (courseIndex > -1) {
      const newModule: Modulo = {
        ...modulo,
        id: Date.now(),
        actividades: []
      };
      courses[courseIndex].modulos?.push(newModule);
      this.cursos$.next(courses);
    }
  }
}
