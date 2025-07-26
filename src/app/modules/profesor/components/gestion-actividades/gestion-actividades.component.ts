import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalActividadComponent } from '../modal-actividad/modal-actividad.component';

@Component({
  selector: 'app-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class GestionActividadesComponent implements OnInit {
  moduloId: number = 0;
  modulo: any = null;
  actividades: any[] = [];
  actividadesCompletadas: number = 0;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.moduloId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarDatosModulo();
    this.cargarActividades();
  }

  cargarDatosModulo() {
    // Simulación de datos - en una app real sería una llamada HTTP
    const modulosEjemplo = [
      {
        id: 1,
        titulo: 'Álgebra Lineal',
        descripcion: 'Vectores, matrices y transformaciones lineales',
        curso: 'Matemáticas Avanzadas',
        actividades: [1, 2, 3, 4]
      },
      {
        id: 2,
        titulo: 'Cálculo Diferencial',
        descripcion: 'Límites, derivadas y aplicaciones',
        curso: 'Matemáticas Avanzadas',
        actividades: [5, 6, 7, 8]
      }
    ];

    this.modulo = modulosEjemplo.find(m => m.id === this.moduloId) || null;
  }

  cargarActividades() {
    // Simulación de datos - en una app real sería una llamada HTTP
    const todasActividades = [
      { id: 1, titulo: 'Introducción a vectores', tipo: 'lectura', descripcion: 'Conceptos básicos de vectores', duracion: '30 min', recursos: 3, completada: true, moduloId: 1 },
      { id: 2, titulo: 'Ejercicios prácticos', tipo: 'tarea', descripcion: 'Problemas aplicados', fechaLimite: '2023-12-15', calificacion: 95, completada: true, moduloId: 1 },
      { id: 3, titulo: 'Matrices y determinantes', tipo: 'lectura', descripcion: 'Teoría de matrices', duracion: '45 min', recursos: 2, completada: true, moduloId: 1 },
      { id: 4, titulo: 'Proyecto final', tipo: 'proyecto', descripcion: 'Aplicación de conceptos', fechaLimite: '2023-12-20', calificacion: 90, completada: true, moduloId: 1 },
      { id: 5, titulo: 'Introducción a límites', tipo: 'lectura', descripcion: 'Conceptos básicos', duracion: '35 min', recursos: 2, completada: true, moduloId: 2 },
      { id: 6, titulo: 'Definición de derivada', tipo: 'lectura', descripcion: 'Fundamentos teóricos', duracion: '40 min', recursos: 3, completada: true, moduloId: 2 },
      { id: 7, titulo: 'Ejercicios de derivación', tipo: 'tarea', descripcion: 'Problemas prácticos', fechaLimite: '2023-12-18', completada: false, moduloId: 2 },
      { id: 8, titulo: 'Aplicaciones de derivadas', tipo: 'lectura', descripcion: 'Casos de uso reales', duracion: '50 min', recursos: 4, completada: false, moduloId: 2 }
    ];

    this.actividades = todasActividades.filter(a => a.moduloId === this.moduloId);
    this.actividadesCompletadas = this.actividades.filter(a => a.completada).length;
  }

  getIconoActividad(tipo: string): string {
    switch(tipo) {
      case 'lectura': return 'book-outline';
      case 'tarea': return 'document-text-outline';
      case 'proyecto': return 'cube-outline';
      case 'examen': return 'school-outline';
      default: return 'help-circle-outline';
    }
  }

  formatearFecha(fechaString: string | undefined): string {
    if (!fechaString) return 'Sin fecha definida';
    return new Date(fechaString).toLocaleDateString('es-ES');
  }

  calcularProgresoModulo(): number {
    return this.actividades.length > 0 ?
      Math.round((this.actividadesCompletadas / this.actividades.length) * 100) : 0;
  }

  async abrirModalActividad(actividad?: any) {
    const modal = await this.modalCtrl.create({
      component: ModalActividadComponent,
      componentProps: {
        actividadEditando: actividad ? {...actividad} : null,
        moduloId: this.moduloId
      },
      cssClass: 'modal-actividad'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.eliminar) {
        this.eliminarActividad(data.id);
      } else if (data.actividad) {
        if (actividad) {
          // Editar actividad existente
          const index = this.actividades.findIndex(a => a.id === actividad.id);
          if (index !== -1) {
            this.actividades[index] = data.actividad;
          }
        } else {
          // Agregar nueva actividad
          this.actividades.push({
            ...data.actividad,
            id: Date.now(),
            moduloId: this.moduloId,
            completada: false
          });
        }
        this.actualizarProgreso();
      }
    }
  }

  async confirmarEliminacion(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta actividad?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.eliminarActividad(id);
          }
        }
      ],
      cssClass: 'alerta-eliminar'
    });

    await alert.present();
  }

  eliminarActividad(id: number) {
    this.actividades = this.actividades.filter(a => a.id !== id);
    this.actualizarProgreso();
  }

  actualizarProgreso() {
    this.actividadesCompletadas = this.actividades.filter(a => a.completada).length;
  }
}
