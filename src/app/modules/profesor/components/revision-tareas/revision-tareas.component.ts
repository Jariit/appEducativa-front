// revision-tareas.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { FiltroTareasPipe } from 'src/app/pipes/filtros.pipe';
@Component({
  selector: 'app-revision-tareas',
  templateUrl: './revision-tareas.component.html',
  styleUrls: ['./revision-tareas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, FiltroTareasPipe]
})
export class RevisionTareasComponent implements OnInit {
  tareas = [
    {
      id: 1,
      estudiante: 'Juan Pérez',
      curso: 'Programación JavaScript',
      actividad: 'Tarea práctica 1',
      enviada: '2023-11-15',
      archivo: 'tarea_juan.zip',
      estado: 'pendiente',
      calificacion: null,
      comentario: ''
    },
    {
      id: 2,
      estudiante: 'María Gómez',
      curso: 'Matemáticas Avanzadas',
      actividad: 'Problemas álgebra',
      enviada: '2023-11-16',
      archivo: 'algebra_maria.pdf',
      estado: 'pendiente',
      calificacion: null,
      comentario: ''
    }
  ];

  filtro = {
    curso: '',
    estado: 'pendiente'
  };

  cursosUnicos = [...new Set(this.tareas.map(t => t.curso))];

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    // Aquí cargarías las tareas reales desde un servicio
  }

  async mostrarOpcionesCalificacion(tarea: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Calificar tarea',
      buttons: [
        {
          text: 'Excelente (100)',
          handler: () => this.calificarTarea(tarea, 100)
        },
        {
          text: 'Bien (80)',
          handler: () => this.calificarTarea(tarea, 80)
        },
        {
          text: 'Regular (60)',
          handler: () => this.calificarTarea(tarea, 60)
        },
        {
          text: 'Insuficiente (40)',
          handler: () => this.calificarTarea(tarea, 40)
        },
        {
          text: 'Muy deficiente (0)',
          handler: () => this.calificarTarea(tarea, 0)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  calificarTarea(tarea: any, calificacion: number) {
    tarea.calificacion = calificacion;
    tarea.estado = 'calificado';
    // Aquí iría la llamada al servicio para guardar la calificación
  }

  guardarComentario(tarea: any) {
    // Lógica para guardar el comentario
    console.log(`Comentario guardado para tarea ${tarea.id}: ${tarea.comentario}`);
  }

  descargarArchivo(nombreArchivo: string) {
    // Lógica para descargar el archivo
    console.log(`Descargando ${nombreArchivo}`);
  }
}
