import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  @Input() colorHeader: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() mostrarMenu: boolean = true;
  @Input() mostrarNotificaciones: boolean = true;
  @Input() cantidadNotificaciones: number = 0;
  @Output() menuToggle = new EventEmitter<void>();

  mostrarMenuPerfil: boolean = false;
  nombreUsuario: string = 'Usuario';
  rolUsuario: string = 'Rol';
  avatarUrl: string | null = 'assets/avatar-default.png';
  valorProgreso: number = 0.5;
  mostrarProgreso: boolean = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadUserData();
  }

// Modificar el método loadUserData
// En header.component.ts

async loadUserData() {
  const currentUser = this.authService.getCurrentUser();

  if (currentUser) {
    console.log('Usuario actual:', currentUser); // Para depuración

    // Mostrar nombre del usuario
    this.nombreUsuario = `${currentUser.nombres || ''} ${currentUser.apellidos || ''}`.trim() || 'Usuario';

    // Obtener el nombre del rol
    this.rolUsuario = await this.getRoleName(currentUser.rol_id);

    // Si necesitas datos adicionales del perfil:
    try {
      const response: any = await this.userService.getProfile(currentUser.id).toPromise();
      if (response?.success) {
        // Actualizar datos si es necesario
        if (response.user.nombres) {
          this.nombreUsuario = `${response.user.nombres} ${response.user.apellidos}`.trim();
        }
        if (response.user.rol_id) {
          this.rolUsuario = await this.getRoleName(response.user.rol_id);
        }
      }
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  } else {
    console.warn('No hay usuario logueado');
    this.nombreUsuario = 'Invitado';
    this.rolUsuario = 'Invitado';
  }
}

private async getRoleName(roleId: number): Promise<string> {
  // Si el AuthService tiene un método para obtener el nombre del rol
  if (this.authService['getRoleName']) {
    return this.authService.getRoleName(roleId);
  }

  // Mapeo de roles por defecto
  const roleMappings: {[key: number]: string} = {
    1: 'Estudiante',
    2: 'Profesor',
    3: 'Administrador'
  };

  return roleMappings[roleId] || 'Invitado';
}

translateRole(role: string | number): string {
  if (typeof role === 'number') {
    role = this.authService.getRoleName(role);
  }

  const roles: { [key: string]: string } = {
    'estudiante': 'Estudiante',
    'profesor': 'Profesor',
    'admin': 'Administrador',
    'invitado': 'Invitado'
  };

  return roles[role.toLowerCase()] || role;
}


  toggleMenu() {
    this.menuToggle.emit();
  }

  togglePerfilMenu(event: Event) {
    event.stopPropagation();
    this.mostrarMenuPerfil = !this.mostrarMenuPerfil;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-container')) {
      this.mostrarMenuPerfil = false;
    }
  }

  async confirmarCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
        }
      ]
    });

    await alert.present();
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
}
