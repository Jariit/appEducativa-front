import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-calificar-actividades',
  templateUrl: './calificar-actividades.component.html',
  styleUrls: ['./calificar-actividades.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class CalificarActividadesComponent implements OnInit {
  actividadId: number = 0;
  actividad: any = null;
  estudiante: any = null;
  entrega: any = null;
  calificacion: number | null = null;
  retroalimentacion: string = '';

  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.actividadId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarDatos();
  }

  cargarDatos() {
    // Simulación de datos - en una app real sería una llamada HTTP
    const actividadesEjemplo = [
      {
        id: 1,
        titulo: 'Ejercicios prácticos',
        tipo: 'tarea',
        descripcion: 'Problemas aplicados de álgebra lineal',
        puntos: 100
      }
    ];

    const estudiantesEjemplo = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' }
    ];

    const entregasEjemplo = [
      {
        id: 1,
        estudianteId: 1,
        actividadId: 1,
        archivos: ['entrega1.pdf'],
        calificacion: null,
        retroalimentacion: ''
      }
    ];

    this.actividad = actividadesEjemplo.find(a => a.id === this.actividadId) || null;
    this.estudiante = estudiantesEjemplo[0]; // En realidad debería venir del parámetro
    this.entrega = entregasEjemplo.find(e => e.actividadId === this.actividadId) || null;

    if (this.entrega) {
      this.calificacion = this.entrega.calificacion;
      this.retroalimentacion = this.entrega.retroalimentacion;
    }
  }

  async guardarCalificacion() {
    if (this.calificacion === null || this.calificacion < 0 || this.calificacion > (this.actividad?.puntos || 100)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingrese una calificación válida',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // En una app real, aquí iría la llamada al servicio para guardar
    if (this.entrega) {
      this.entrega.calificacion = this.calificacion;
      this.entrega.retroalimentacion = this.retroalimentacion;
    }

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Calificación guardada correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }

  descargarArchivo(nombreArchivo: string) {
    console.log('Descargando archivo:', nombreArchivo);
    // Lógica para descargar archivo
  }
}
