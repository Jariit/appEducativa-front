import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTareas',
  standalone: true
})
export class FiltroTareasPipe implements PipeTransform {
  transform(tareas: any[], filtro: any): any[] {
    return tareas.filter(tarea => {
      const coincideCurso = filtro.curso ?
        tarea.curso.toLowerCase().includes(filtro.curso.toLowerCase()) : true;
      const coincideEstado = tarea.estado === filtro.estado;
      return coincideCurso && coincideEstado;
    });
  }
}

@Pipe({
  name: 'filtroCurso'
})
export class FiltroCursoPipe implements PipeTransform {
  transform(tests: any[], curso: string): any[] {
    if (!curso) return tests;
    return tests.filter(test => test.curso === curso);
  }
}
