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
      fechaFin: '2023-12-15'
    },
    {
      id: 2,
      titulo: 'Programación JavaScript',
      estudiantes: 18,
      estado: 'activo',
      fechaInicio: '2023-10-01',
      fechaFin: '2024-01-20'
    }
  ];

  constructor(private modalCtrl: ModalController) {}

  async abrirModalCrearCurso() {
    const modal = await this.modalCtrl.create({
      component: CrearCursoModalComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.cursos.push(data);
    }
  }
}
