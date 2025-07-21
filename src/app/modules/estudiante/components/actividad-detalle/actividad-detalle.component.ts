// actividad-detalle.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
@Component({
  selector: 'app-actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule,HeaderComponent]
})
export class ActividadDetalleComponent {
  activity = {
    id: 2,
    title: 'Ejercicios prácticos',
    type: 'assignment',
    description: 'Resuelve los siguientes problemas de álgebra lineal. Debes mostrar todos los pasos para llegar a la solución.',
    instructions: '1. Resuelve los sistemas de ecuaciones\n2. Calcula los determinantes\n3. Encuentra las inversas de las matrices dadas',
    dueDate: '2023-12-15',
    completed: false,
    submission: '',
    attachments: [
      { name: 'Problemas.pdf', type: 'pdf', size: '2.4 MB' },
      { name: 'Material de apoyo.docx', type: 'word', size: '1.1 MB' }
    ]
  };

  // Método para enviar la tarea
  submitAssignment() {
    this.activity.completed = true;
    // Aquí iría la lógica para enviar al servidor
  }

  // Método para obtener el icono según el tipo de archivo
  getFileIcon(type: string): string {
    switch(type) {
      case 'pdf': return 'document-text';
      case 'word': return 'document-text';
      case 'image': return 'image';
      case 'video': return 'videocam';
      default: return 'document';
    }
  }
}
