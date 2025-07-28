import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

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
  ): boolean {
    const requiredRoles = next.data['roles'] as string[];
    const currentUser = this.authService.getCurrentUser();

    // Si la ruta no requiere autenticación
    if (!requiredRoles) return true;

    // Si no hay usuario logueado, redirigir a login
    if (!currentUser) {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    const hasAccess = requiredRoles.some(role =>
      this.authService.hasRole(currentUser.rol_id, role)
    );

    if (!hasAccess) {
      // Redirigir al home según su rol o a página de acceso denegado
      this.router.navigate([this.authService.getHomeForRole(currentUser.rol_id)]);
      return false;
    }

    return true;
  }
}
