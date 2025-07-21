import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    HeaderComponent // Importar como standalone
  ],
  exports: [
    HeaderComponent // Exportar para que otros módulos puedan usarlo
  ]
})
export class SharedModule {}
