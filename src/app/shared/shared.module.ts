import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {}
