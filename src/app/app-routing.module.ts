import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),

  },
  {
    path: 'estudiante',
    loadChildren: () => import('./modules/estudiante/estudiante.module').then(m => m.EstudianteModule),
    canActivate: [AuthGuard],
    data: { role: 'estudiante' }
  },
  {
    path: 'profesor',
    loadChildren: () => import('./modules/profesor/profesor.module').then(m => m.ProfesorModule),
    canActivate: [AuthGuard],
    data: { role: 'profesor' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      bindToComponentInputs: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
