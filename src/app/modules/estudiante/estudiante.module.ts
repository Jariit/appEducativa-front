import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Importar todos los componentes standalone
import { CursosDisponiblesComponent } from './components/cursos-disponibles/cursos-disponibles.component';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';
import { ModuloDetalleComponent } from './components/modulo-detalle/modulo-detalle.component';
import { ActividadDetalleComponent } from './components/actividad-detalle/actividad-detalle.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

@NgModule({
  imports: [
    CommonModule,
     IonicModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: 'cursos', component: CursosDisponiblesComponent },
          { path: 'curso/:id', component: CursoDetalleComponent },
          { path: 'modulo/:id', component: ModuloDetalleComponent },
          { path: 'actividad/:id', component: ActividadDetalleComponent },
          { path: 'resultados', component: ResultadosComponent },
          { path: '', redirectTo: 'cursos', pathMatch: 'full' }
        ]
      }
    ]),
    // Importar componentes standalone
    CursosDisponiblesComponent,
    CursoDetalleComponent,
    ModuloDetalleComponent,
    ActividadDetalleComponent,
    ResultadosComponent
  ]
})
export class EstudianteModule {}
