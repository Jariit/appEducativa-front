import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  AlertController,
  ModalController,
  ToastController
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class DetalleActividadComponent implements OnInit {
  actividadId: number = 0;
  actividad: any = {
    recursos: []
  };
  estudiantes: any[] = [];
  entregas: any[] = [];
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.actividadId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.cargarActividad();
    this.cargarEstudiantes();
    this.cargarEntregas();
    this.cargando = false;
  }

  cargarActividad() {
    // Simulación de datos - en una app real sería una llamada HTTP
    const actividadesEjemplo = [
      {
        id: 1,
        titulo: 'Ejercicios prácticos de Álgebra Lineal',
        tipo: 'tarea',
        descripcion: 'Resuelva los problemas aplicados de álgebra lineal',
        fechaLimite: '2023-12-15',
        moduloId: 1,
        cursoId: 1,
        instrucciones: 'Resuelva los siguientes problemas y muestre todo el procedimiento.',
        puntos: 100,
        recursos: ['ejercicio_vectores.pdf', 'pdf_prueba_actividades.pdf', 'guia-practica.docx']
      }
    ];

    this.actividad = actividadesEjemplo.find(a => a.id === this.actividadId) || null;
  }

  cargarEstudiantes() {
    // Simulación de datos
    this.estudiantes = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', avatar: 'assets/avatar1.png' },
      { id: 2, nombre: 'María García', email: 'maria@example.com', avatar: 'assets/avatar2.png' },
      { id: 3, nombre: 'Carlos López', email: 'carlos@example.com', avatar: 'assets/avatar3.png' }
    ];
  }

  cargarEntregas() {
    // Simulación de datos
    this.entregas = [
      {
        id: 1,
        estudianteId: 1,
        actividadId: this.actividadId,
        fechaEntrega: '2023-12-14T10:30:00',
        archivos: ['entrega1.pdf', 'codigo.zip'],
        calificacion: 95,
        retroalimentacion: 'Excelente trabajo, muy bien documentado.',
        estado: 'calificado'
      },
      {
        id: 2,
        estudianteId: 2,
        actividadId: this.actividadId,
        fechaEntrega: '2023-12-15T08:45:00',
        archivos: ['proyecto_maria.pdf'],
        calificacion: null,
        retroalimentacion: '',
        estado: 'pendiente'
      }
    ];
  }

  getAvatarEstudiante(estudianteId: number): string {
    const estudiante = this.estudiantes.find(e => e.id === estudianteId);
    return estudiante?.avatar || 'assets/default-avatar.png';
  }

  getNombreEstudiante(estudianteId: number): string {
    const estudiante = this.estudiantes.find(e => e.id === estudianteId);
    return estudiante ? estudiante.nombre : 'Desconocido';
  }

  formatearFecha(fechaString: string | null): string {
    if (!fechaString) return 'No entregado';
    return new Date(fechaString).toLocaleString('es-ES');
  }

  async calificarEntrega(entrega: any) {
    const estudiante = this.estudiantes.find(e => e.id === entrega.estudianteId);

    const alert = await this.alertController.create({
      header: `Calificar a ${estudiante?.nombre || 'Estudiante'}`,
      inputs: [
        {
          name: 'calificacion',
          type: 'number',
          placeholder: 'Calificación (0-100)',
          min: 0,
          max: 100,
          value: entrega.calificacion || ''
        },
        {
          name: 'retroalimentacion',
          type: 'textarea',
          placeholder: 'Retroalimentación',
          value: entrega.retroalimentacion || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            entrega.calificacion = data.calificacion;
            entrega.retroalimentacion = data.retroalimentacion;
            entrega.estado = 'calificado';
            this.mostrarToast('Calificación guardada con éxito', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  obtenerIcono(nombreArchivo: string): string {
    const extension = nombreArchivo.split('.').pop()?.toLowerCase();
    switch(extension) {
      case 'pdf':
        return 'document-text-outline';
      case 'doc':
      case 'docx':
        return 'document-outline';
      case 'xls':
      case 'xlsx':
        return 'document-outline';
      case 'ppt':
      case 'pptx':
        return 'document-outline';
      case 'zip':
      case 'rar':
        return 'archive-outline';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image-outline';
      default:
        return 'document-outline';
    }
  }

  puedePrevisualizar(nombreArchivo: string): boolean {
    const extension = nombreArchivo.split('.').pop()?.toLowerCase();
    return ['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(extension || '');
  }

async descargarRecurso(nombreArchivo: string, previsualizar: boolean = false): Promise<void> {
  try {
    console.log('Intentando descargar:', nombreArchivo);

    this.cargando = true;
    const tipo = 'materiales'; // O 'entregas' según corresponda

    if (previsualizar) {
      // Para previsualización
      this.profesorService.descargarArchivo(tipo, nombreArchivo, true).subscribe({
        next: () => {
          this.mostrarToast('Archivo abierto en nueva pestaña', 'success');
        },
        error: (err) => {
          console.error('Error al previsualizar:', err);
          this.mostrarToast(`Error: ${err.message}`, 'danger');
        },
        complete: () => {
          this.cargando = false;
        }
      });
    } else {
      // Para descarga directa
      this.profesorService.descargarArchivo(tipo, nombreArchivo).subscribe({
        next: (response) => {
          saveAs(response.body, nombreArchivo);
          this.mostrarToast('Archivo descargado con éxito', 'success');
        },
        error: (err) => {
          console.error('Error al descargar:', err);
          this.mostrarToast(`Error: ${err.message}`, 'danger');

          // Mostrar detalles adicionales en consola
          console.log('Nombre archivo:', nombreArchivo);
          console.log('Tipo:', tipo);
        },
        complete: () => {
          this.cargando = false;
        }
      });
    }
  } catch (err) {
    console.error('Error inesperado:', err);
    this.mostrarToast('Ocurrió un error inesperado', 'danger');
    this.cargando = false;
  }
}

  descargarEntrega(nombreArchivo: string): void {
    this.descargarRecurso(nombreArchivo, false);
  }

  private async mostrarToast(mensaje: string, color: string = 'primary'): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}
