// resultados.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ResultadosComponent {
  results = [
    {
      course: 'Matemáticas Avanzadas',
      score: 85,
      date: '2023-11-20',
      teacher: 'Prof. García',
      modules: [
        { name: 'Álgebra Lineal', score: 90 },
        { name: 'Cálculo Diferencial', score: 80 }
      ]
    },
    {
      course: 'Programación JavaScript',
      score: 92,
      date: '2023-10-15',
      teacher: 'Prof. Martínez',
      modules: [
        { name: 'Fundamentos', score: 95 },
        { name: 'Funciones', score: 89 }
      ]
    }
  ];

  // Método para determinar el color según la calificación
  getScoreColor(score: number): string {
    if (score >= 90) return 'success';
    if (score >= 70) return 'primary';
    return 'danger';
  }
}
