import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-curso-modal',
  templateUrl: './crear-curso-modal.component.html',
  styleUrls: ['./crear-curso-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CrearCursoModalComponent {
  formularioCurso: FormGroup;
  imagenPrevisualizacion: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.formularioCurso = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      categoria: ['', Validators.required],
      nivel: ['principiante', Validators.required],
      imagen: [null]
    });
  }

  seleccionarImagen() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => this.onImageChange(event);
    fileInput.click();
  }

  async onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.formularioCurso.patchValue({ imagen: file });
      this.formularioCurso.get('imagen')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPrevisualizacion = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.formularioCurso.valid) {
      const cursoData = {
        ...this.formularioCurso.value,
        imagenPrevisualizacion: this.imagenPrevisualizacion
      };
      await this.modalCtrl.dismiss(cursoData, 'confirm');
    }
  }

  async cancelar() {
    await this.modalCtrl.dismiss(null, 'cancel');
  }
}
