// gestion-cursos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CrearCursoModalComponent } from '../crear-curso-modal/crear-curso-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-gestion-cursos',
  templateUrl: './gestion-cursos.component.html',
  styleUrls: ['./gestion-cursos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, SharedModule]
})
export class GestionCursosComponent {
  cursos = [
    {
      id: 1,
      titulo: 'Matemáticas Avanzadas',
      estudiantes: 25,
      estado: 'activo',
      fechaInicio: '2023-09-01',
      fechaFin: '2023-12-15',
      imagen: '../../../../../assets/advanced-math-formulas-on-seamless-260nw-2500229937.webp'
    },
    {
      id: 2,
      titulo: 'Programación JavaScript',
      estudiantes: 18,
      estado: 'activo',
      fechaInicio: '2023-10-01',
      fechaFin: '2024-01-20',
      imagen: '../../../../../assets/Unofficial_JavaScript_logo_2.svg.png'
    },
    {
      id: 3,
      titulo: 'Introducción a la Física',
      estudiantes: 12,
      estado: 'inactivo',
      fechaInicio: '2023-08-15',
      fechaFin: '2023-11-30'
    }
  ];

  constructor(private modalCtrl: ModalController) {}

  // Método para calcular estudiantes totales
  totalEstudiantes(): number {
    return this.cursos.reduce((sum, curso) => sum + curso.estudiantes, 0);
  }

  // Método para contar cursos activos
  cursosActivos(): number {
    return this.cursos.filter(curso => curso.estado === 'activo').length;
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

  async abrirModalCrearCurso() {
    const modal = await this.modalCtrl.create({
      component: CrearCursoModalComponent,
      cssClass: 'modal-pequeno'
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.cursos.unshift({
        id: Math.max(...this.cursos.map(c => c.id)) + 1,
        titulo: data.titulo,
        estudiantes: 0,
        estado: 'activo',
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString()
      });
    }
  }
}
