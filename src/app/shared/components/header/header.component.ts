import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent {
  @Input() colorHeader: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() mostrarMenu: boolean = true;
  @Input() mostrarNotificaciones: boolean = true;
  @Input() cantidadNotificaciones: number = 0;

  mostrarMenuPerfil: boolean = false;
  nombreUsuario: string = 'Usuario Ejemplo';
  rolUsuario: string = 'ROL';
  avatarUrl: string | null = 'assets/avatar-default.png';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  // Cierra el menú si se hace clic fuera de él
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-container')) {
      this.mostrarMenuPerfil = false;
    }
  }

  togglePerfilMenu() {
    this.mostrarMenuPerfil = !this.mostrarMenuPerfil;
  }

  async confirmarCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: () => this.cerrarSesion()
        }
      ]
    });

    await alert.present();
  }

  cerrarSesion() {
    this.mostrarMenuPerfil = false;
    // Lógica para cerrar sesión
    this.router.navigate(['/login']);
  }

  abrirPerfil() {
    this.mostrarMenuPerfil = false;
    this.router.navigate(['/perfil']);
  }

  abrirConfiguracion() {
    this.mostrarMenuPerfil = false;
    this.router.navigate(['/configuracion']);
  }

  abrirNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  irInicio() {
    this.router.navigate(['/inicio']);
  }
  mostarInfoUsuario() {
    this.router.navigate(['/perfil']);  }

    mostarProgreso() {
    // Lógica para mostrar el progreso del usuario
  }
  valorProgreso: number = 0.5; // Valor de ejemplo, puede ser dinámico
  mostrarProgreso: boolean = true; // Controla si se muestra la barra de progreso

mostrarInfoUsuario() {
    this.router.navigate(['/perfil']);
  }
}


