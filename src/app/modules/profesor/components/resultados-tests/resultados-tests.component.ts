import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { FiltroCursoPipe } from 'src/app/pipes/filtros.pipe';
import { FormsModule } from '@angular/forms';
// Definición de interfaces para tipado fuerte
interface Estudiante {
  id: number;
  nombre: string;
  calificacion: number;
}

interface ResultadoTest {
  id: number;
  curso: string;
  test: string;
  fecha: string;
  promedio: number;
  estudiantes: Estudiante[];
}

@Component({
  selector: 'app-resultados-tests',
  templateUrl: './resultados-tests.component.html',
  styleUrls: ['./resultados-tests.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule, FiltroCursoPipe]
})
export class ResultadosTestsComponent implements OnInit {
  resultados: ResultadoTest[] = [
    {
      id: 1,
      curso: 'Programación JavaScript',
      test: 'Examen Final',
      fecha: '2023-11-10',
      promedio: 85,
      estudiantes: [
        { id: 101, nombre: 'Juan Pérez', calificacion: 85 },
        { id: 102, nombre: 'María Gómez', calificacion: 92 },
        { id: 103, nombre: 'Carlos Ruiz', calificacion: 78 }
      ]
    },
    {
      id: 2,
      curso: 'Matemáticas Avanzadas',
      test: 'Quiz Álgebra',
      fecha: '2023-11-05',
      promedio: 82.5,
      estudiantes: [
        { id: 101, nombre: 'Juan Pérez', calificacion: 70 },
        { id: 102, nombre: 'María Gómez', calificacion: 95 }
      ]
    }
  ];

  filtroCurso: string = '';
  cursosUnicos: string[] = [...new Set(this.resultados.map(r => r.curso))];
  chart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.crearGrafico(this.resultados[0]);
  }

  crearGrafico(test: ResultadoTest): void {
    const ctx = document.getElementById('graficoTest') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: test.estudiantes.map(e => e.nombre),
        datasets: [{
          label: 'Calificaciones',
          data: test.estudiantes.map(e => e.calificacion),
          backgroundColor: test.estudiantes.map(e =>
            this.getColorCalificacion(e.calificacion).replace(')', ', 0.7)').replace('rgb', 'rgba')
          ),
          borderColor: test.estudiantes.map(e => this.getColorCalificacion(e.calificacion)),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  getColorCalificacion(calificacion: number): string {
    if (calificacion >= 90) return 'rgb(45, 211, 111)'; // success
    if (calificacion >= 70) return 'rgb(56, 128, 255)'; // primary
    return 'rgb(235, 68, 90)'; // danger
  }

  verDetalleEstudiante(estudianteId: number): void {
    // Navegar al detalle del estudiante
    console.log('Ver detalle del estudiante:', estudianteId);
    // Ejemplo de navegación:
    // this.router.navigate(['/estudiante', estudianteId]);
  }

  // Métodos para manejo de eventos (si los necesitas)
  handleInput(e: Event): void {
    const element = e.target as HTMLInputElement;
    console.log('Input value:', element.value);
  }

  handleClick(e: MouseEvent): void {
    e.preventDefault();
    console.log('Button clicked at:', e.clientX, e.clientY);
  }
}
