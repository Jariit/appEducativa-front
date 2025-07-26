import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes Standalone
import { GestionCursosComponent } from './components/gestion-cursos/gestion-cursos.component';
import { GestionModulosComponent } from './components/gestion-modulos/gestion-modulos.component';
import { GestionActividadesComponent } from './components/gestion-actividades/gestion-actividades.component';
import { RevisionTareasComponent } from './components/revision-tareas/revision-tareas.component';
import { ResultadosTestsComponent } from './components/resultados-tests/resultados-tests.component';
import { CrearCursoModalComponent } from './components/crear-curso-modal/crear-curso-modal.component';
import { FiltroTareasPipe, FiltroCursoPipe } from '../../pipes/filtros.pipe';
import { ProfesorService } from '../../services/profesor.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: 'cursos', component: GestionCursosComponent },
          { path: 'cursos/:id/modulos', component: GestionModulosComponent },
          { path: 'modulos/:id/actividades', component: GestionActividadesComponent },


          { path: 'tareas', component: RevisionTareasComponent },
          { path: 'resultados', component: ResultadosTestsComponent },
          { path: '', redirectTo: 'cursos', pathMatch: 'full' }
        ]
      }
    ]),
    // Importar componentes standalone
    GestionCursosComponent,
    GestionModulosComponent,
    GestionActividadesComponent,
    RevisionTareasComponent,
    ResultadosTestsComponent,
    CrearCursoModalComponent,
     FiltroCursoPipe,
    FiltroTareasPipe
  ],
  providers: [ProfesorService],
})
export class ProfesorModule {}
