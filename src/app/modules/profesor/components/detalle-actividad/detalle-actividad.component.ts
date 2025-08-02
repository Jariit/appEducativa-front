import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class DetalleActividadComponent implements OnInit {
  actividadId: number = 0;
  actividad: any = {
    recursos: [] // Inicializa el array de recursos
  };
  estudiantes: any[] = [];
  entregas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.actividadId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarActividad();
    this.cargarEstudiantes();
    this.cargarRecursosManuales();
    this.cargarEntregas();
  }

  cargarActividad() {
    // Simulación de datos - en una app real sería una llamada HTTP
    const actividadesEjemplo = [
      {
        id: 1,
        titulo: 'Ejercicios prácticos',
        tipo: 'tarea',
        descripcion: 'Problemas aplicados de álgebra lineal',
        fechaLimite: '2023-12-15',
        moduloId: 1,
        cursoId: 1,
        instrucciones: 'Resuelva los siguientes problemas y muestre todo el procedimiento.',
        puntos: 100,
        recursos: ['Problemas.pdf', 'Ejemplos.docx']
      }
    ];

    this.actividad = actividadesEjemplo.find(a => a.id === this.actividadId) || null;
  }
  cargarRecursosManuales() {
    // Lista de archivos que agregaste manualmente
    const archivosManuales = [
      'ejercicio_vectores.pdf',
      'pdf_prueba_actividades.pdf',
      'guia-practica.docx'
    ];

    this.actividad.recursos = archivosManuales;
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

  // Método para obtener el avatar del estudiante
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
          }
        }
      ]
    });

    await alert.present();
  }
  cargarDatos() {
    // Implementa tu lógica para cargar actividad y entregas
  }

// detalle-actividad.component.ts
descargarArchivo(nombreArchivo: string, esRecurso: boolean = true): void {
  const tipo = esRecurso ? 'materials' : 'entregas';

  this.profesorService.descargarArchivo(tipo, nombreArchivo).subscribe({
    next: (response) => {
      // Crear URL del blob
      const blob = new Blob([response.body], {
        type: response.headers.get('Content-Type') || 'application/octet-stream'
      });

      // Crear enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Obtener nombre de archivo del header o usar el proporcionado
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = nombreArchivo;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Limpieza
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    },
    error: (err) => {
      console.error('Error completo:', err);
      let mensaje = 'Error al descargar el archivo';

      if (err.error?.message) {
        mensaje = err.error.message;
      } else if (err.status === 404) {
        mensaje = 'Archivo no encontrado en el servidor';
      } else if (err.status === 500) {
        mensaje = 'Error interno del servidor';
      }

      this.mostrarError(mensaje);

      // Mostrar detalles adicionales en consola
      if (err.error?.details) {
        console.error('Detalles del error:', err.error.details);
      }
    }
  });
}

private obtenerTipoMIME(nombreArchivo: string): string {
  const extension = nombreArchivo.split('.').pop()?.toLowerCase() || '';
  const tiposMIME: Record<string, string> = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'zip': 'application/zip',
    'txt': 'text/plain'
  };
  return tiposMIME[extension] || 'application/octet-stream';
}

private obtenerMensajeError(err: any): string {
  if (err.status === 404) return 'Archivo no encontrado en el servidor';
  if (err.status === 500) return 'Error interno del servidor';
  return 'Error al descargar el archivo';
}

private mostrarError(mensaje: string): void {
  // Implementa tu sistema de notificación preferido
  alert(mensaje); // Ejemplo básico
}

}
