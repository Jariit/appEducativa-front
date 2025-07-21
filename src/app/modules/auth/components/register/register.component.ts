// src/app/modules/auth/components/register/register.component.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  userType: 'student' | 'teacher' = 'student';

  register() {
    console.log('Register attempt:', this.userData, this.userType);
    // Aquí iría la lógica de registro real
  }
}
