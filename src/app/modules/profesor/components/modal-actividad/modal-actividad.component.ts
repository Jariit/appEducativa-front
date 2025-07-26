import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

interface Pregunta {
  texto: string;
  puntos: number;
  opciones: Opcion[];
}

interface Opcion {
  texto: string;
  correcta: boolean;
}

interface ArchivoAdjunto {
  nombre: string;
  url?: string;
  file?: File;
}

@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styleUrls: ['./modal-actividad.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ModalActividadComponent {
  @Input() actividadEditando: any;
  @Input() moduloId: number = 0;

  actividad = {
    titulo: '',
    tipo: 'lectura',
    descripcion: '',
    duracion: '',
    recursos: 0,
    fechaLimite: '',
    puntuacionMaxima: 100,
    duracionExamen: 30,
    intentosPermitidos: 1,
    preguntas: [] as Pregunta[],
    archivos: [] as ArchivoAdjunto[],
    completada: false,
    moduloId: 0
  };

  constructor(private modalCtrl: ModalController) {
    if (this.actividadEditando) {
      this.actividad = {...this.actividadEditando};
      // Inicializar preguntas si no existen
      if (this.actividad.tipo === 'examen' && !this.actividad.preguntas) {
        this.actividad.preguntas = [];
      }
      // Inicializar archivos si no existen
      if (!this.actividad.archivos) {
        this.actividad.archivos = [];
      }
    } else {
      this.actividad.moduloId = this.moduloId;
    }
  }

  actualizarCampos() {
    // Resetear campos específicos al cambiar el tipo
    if (this.actividad.tipo === 'lectura') {
      this.actividad.fechaLimite = '';
      this.actividad.puntuacionMaxima = 100;
    } else if (this.actividad.tipo === 'examen') {
      // Inicializar preguntas si no existen
      if (!this.actividad.preguntas) {
        this.actividad.preguntas = [];
      }
    } else {
      this.actividad.duracion = '';
      this.actividad.recursos = 0;
    }
  }

  seleccionarArchivo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e: any) => {
      const files: FileList = e.target.files;
      for (let i = 0; i < files.length; i++) {
        this.actividad.archivos.push({
          nombre: files[i].name,
          file: files[i]
        });
      }
    };
    input.click();
  }

  eliminarArchivo(index: number) {
    this.actividad.archivos.splice(index, 1);
  }

  agregarPregunta() {
    this.actividad.preguntas.push({
      texto: '',
      puntos: 1,
      opciones: [
        { texto: '', correcta: false },
        { texto: '', correcta: false }
      ]
    });
  }

  eliminarPregunta(index: number) {
    this.actividad.preguntas.splice(index, 1);
  }

  agregarOpcion(preguntaIndex: number) {
    this.actividad.preguntas[preguntaIndex].opciones.push({
      texto: '',
      correcta: false
    });
  }

  eliminarOpcion(preguntaIndex: number, opcionIndex: number) {
    this.actividad.preguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
  }

  async confirmarEliminacion() {
    this.modalCtrl.dismiss({
      eliminar: true,
      id: this.actividadEditando?.id
    });
  }

  guardarActividad() {
    // Validar examen
    if (this.actividad.tipo === 'examen') {
      // Validar que todas las preguntas tengan al menos una opción correcta
      for (const pregunta of this.actividad.preguntas) {
        const tieneCorrecta = pregunta.opciones.some(op => op.correcta);
        if (!tieneCorrecta) {
          alert('Cada pregunta debe tener al menos una opción correcta');
          return;
        }
      }
    }

    this.modalCtrl.dismiss({
      actividad: this.actividad
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
