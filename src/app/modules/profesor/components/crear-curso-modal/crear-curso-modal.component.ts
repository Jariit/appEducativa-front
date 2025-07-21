// crear-curso-modal.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crear-curso-modal',
  templateUrl: './crear-curso-modal.component.html',
  styleUrls: ['./crear-curso-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class CrearCursoModalComponent {
  nuevoCurso = {
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: ''
  };

  constructor(private modalCtrl: ModalController) {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  crearCurso() {
    const curso = {
      ...this.nuevoCurso,
      id: Math.floor(Math.random() * 1000),
      estudiantes: 0,
      estado: 'activo'
    };
    this.modalCtrl.dismiss(curso);
  }
}
