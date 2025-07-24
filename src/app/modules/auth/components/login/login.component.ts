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
        const user = this.authService.getCurrentUser();

        // Redirección basada en el rol
        if (this.authService.isStudent()) {
          this.router.navigate(['/estudiante']);
        } else if (this.authService.isTeacher()) {
          this.router.navigate(['/profesor']);
        } else if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          await this.showAlert('Error', 'Tu rol no tiene una vista asignada');
          this.authService.logout();
        }
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
