import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule, HttpClientModule]
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  credentials = {
    email: '',
    password: ''
  };

  isLoading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

 // En login.component.ts
async login() {
  if (this.loginForm.invalid) {
    return;
  }

  this.isLoading = true;

  try {
    const response = await this.authService.login(
      this.credentials.email,
      this.credentials.password
    ).toPromise();

    if (response?.success) {
      // Guardar todos los datos del usuario
      localStorage.setItem('currentUser', JSON.stringify({
        id: response.user.id,
        nombres: response.user.nombres,
        apellidos: response.user.apellidos,
        email: response.user.email,
        rol_id: response.user.rol_id // Asegúrate que viene este campo
      }));

      // Redirección basada en el rol - Versión mejorada
      this.redirectByRole(response.user.rol_id);
    } else {
      await this.showAlert('Error', response?.message || 'Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Login error:', error);
    await this.showAlert('Error', 'Ocurrió un error al intentar iniciar sesión');
  } finally {
    this.isLoading = false;
  }
}

private redirectByRole(rolId: number) {
  switch(rolId) {
    case 1: // Estudiante
      this.router.navigate(['/estudiante/']);
      break;
    case 2: // Profesor
      this.router.navigate(['/profesor/']);
      break;
    case 3: // Admin
      this.router.navigate(['/admin/']);
      break;
    default:
      this.showAlert('Error', 'Rol no reconocido');
      this.authService.logout();
      this.router.navigate(['/auth/login']);
  }
}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
}
