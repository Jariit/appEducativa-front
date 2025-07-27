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
  actividad: any = null;
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

  descargarArchivos(archivos: string[]) {
    // Lógica para descargar archivos
    console.log('Descargando archivos:', archivos);
  }
}
