import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-modulo',
  templateUrl: './modal-modulo.component.html',
  styleUrls: ['./modal-modulo.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ModalModuloComponent {
  @Input() moduloEditando: any;

  modulo = {
    titulo: '',
    descripcion: '',
    orden: 0,
    tipo: 'teoria'
  };

  constructor(private modalCtrl: ModalController) {
    if (this.moduloEditando) {
      this.modulo = {...this.moduloEditando};
    }
  }

  guardarModulo() {
    this.modalCtrl.dismiss({
      modulo: this.modulo
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
