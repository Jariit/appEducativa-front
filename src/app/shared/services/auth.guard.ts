import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Obtener el rol requerido de la data de la ruta
    const requiredRole = next.data['role'];
    const currentUser = this.authService.getCurrentUser();

    // Si no hay usuario logueado, redirigir a login
    if (!currentUser) {
      return this.redirectToLogin(state);
    }

    // Verificar si el usuario tiene el rol necesario
    const hasRequiredRole = this.checkUserRole(currentUser.rol_id, requiredRole);

    if (!hasRequiredRole) {
      // Redirigir a página de acceso denegado o al home según rol
      return this.handleUnauthorizedAccess(currentUser.rol_id);
    }

    return true;
  }

  private redirectToLogin(state: RouterStateSnapshot): boolean {
    // Guardar la URL solicitada para redirigir después del login
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/auth/login']);
    return false;
  }

  private checkUserRole(userRoleId: number, requiredRole: string): boolean {
    // Mapear roles según tu aplicación
    const roleMappings: {[key: string]: number} = {
      'estudiante': 1,
      'profesor': 2,
      'admin': 3
    };

    // Si la ruta no requiere rol específico, permitir acceso
    if (!requiredRole) return true;

    return userRoleId === roleMappings[requiredRole];
  }

  private handleUnauthorizedAccess(userRoleId: number): boolean {
    // Redirigir según el rol del usuario
    switch(userRoleId) {
      case 1: // Estudiante
        this.router.navigate(['/estudiante/inicio']);
        break;
      case 2: // Profesor
        this.router.navigate(['/profesor/dashboard']);
        break;
      case 3: // Admin
        this.router.navigate(['/admin/panel']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }

    return false;
  }
}
