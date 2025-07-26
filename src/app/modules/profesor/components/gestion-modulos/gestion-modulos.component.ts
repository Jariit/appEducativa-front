import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ModalModuloComponent } from '../modal-modulo/modal-modulo.component';

@Component({
  selector: 'app-gestion-modulos',
  templateUrl: './gestion-modulos.component.html',
  styleUrls: ['./gestion-modulos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class GestionModulosComponent implements OnInit {
  cursoId: number = 0;
  curso: any = null;
  modulos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cursoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarDatosCurso();
    this.cargarModulos();
  }

  cargarDatosCurso() {
    // Simulación de datos - en una app real sería una llamada HTTP
    const cursosEjemplo = [
      {
        id: 1,
        titulo: 'Matemáticas Avanzadas',
        descripcion: 'Este curso cubre los conceptos fundamentales de matemáticas avanzadas necesarios para el desarrollo de habilidades analíticas y de resolución de problemas complejos. Aprenderás desde álgebra lineal hasta cálculo multivariable.',
        profesor: 'Dr. Carlos García',
        horario: 'Lunes y Miércoles 14:00 - 16:00',
        duracion: 8,
        nivel: 'Intermedio - Avanzado',
        imagen: 'assets/advanced-math-formulas-on-seamless-260nw-2500229937.webp',
        modulos: [1, 2]
      },
      {
        id: 2,
        titulo: 'Programación en JavaScript',
        descripcion: 'Aprende los fundamentos de JavaScript, el lenguaje de programación más importante para desarrollo web, incluyendo ES6+ y conceptos avanzados como asincronía y programación funcional.',
        profesor: 'Ing. Laura Martínez',
        horario: 'Martes y Jueves 16:00 - 18:00',
        duracion: 6,
        nivel: 'Principiante - Intermedio',
        imagen: 'assets/Unofficial_JavaScript_logo_2.svg.png',
        modulos: [3, 4]
      }
    ];

    this.curso = cursosEjemplo.find(c => c.id === this.cursoId) || null;
  }

  cargarModulos() {
    // Simulación de datos - en una app real sería una llamada HTTP
    const todosModulos = [
      {
        id: 1,
        titulo: 'Álgebra Lineal',
        descripcion: 'Vectores, matrices y transformaciones lineales',
        completado: true,
        actividades: 4,
        actividadesCompletadas: 4,
        cursoId: 1
      },
      {
        id: 2,
        titulo: 'Cálculo Diferencial',
        descripcion: 'Límites, derivadas y aplicaciones',
        completado: false,
        actividades: 5,
        actividadesCompletadas: 2,
        cursoId: 1
      },
      {
        id: 3,
        titulo: 'Fundamentos de JavaScript',
        descripcion: 'Sintaxis básica, variables y tipos de datos',
        completado: true,
        actividades: 3,
        actividadesCompletadas: 3,
        cursoId: 2
      },
      {
        id: 4,
        titulo: 'Funciones y Scope',
        descripcion: 'Funciones, closures y ámbito de variables',
        completado: false,
        actividades: 4,
        actividadesCompletadas: 2,
        cursoId: 2
      }
    ];

    this.modulos = todosModulos.filter(m => m.cursoId === this.cursoId);
  }

  async abrirModalModulo(modulo?: any) {
    const modal = await this.modalCtrl.create({
      component: ModalModuloComponent,
      componentProps: {
        moduloEditando: modulo ? {...modulo} : null,
        cursoId: this.cursoId
      },
      cssClass: 'modal-pequeno'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data.eliminar) {
        this.eliminarModulo(data.id);
      } else if (data.modulo) {
        if (modulo) {
          // Editar módulo existente
          const index = this.modulos.findIndex(m => m.id === modulo.id);
          if (index !== -1) {
            this.modulos[index] = data.modulo;
          }
        } else {
          // Agregar nuevo módulo
          this.modulos.push({
            ...data.modulo,
            id: Date.now(),
            cursoId: this.cursoId,
            completado: false,
            actividades: 0,
            actividadesCompletadas: 0
          });
        }
      }
    }
  }

  async confirmarEliminacion(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este módulo y todas sus actividades?',
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
            this.eliminarModulo(id);
          }
        }
      ],
      cssClass: 'alerta-eliminar'
    });

    await alert.present();
  }

  eliminarModulo(id: number) {
    this.modulos = this.modulos.filter(m => m.id !== id);
  }

  calcularProgresoModulo(modulo: any): number {
    return modulo.actividades > 0 ?
      Math.round((modulo.actividadesCompletadas / modulo.actividades) * 100) : 0;
  }
}
