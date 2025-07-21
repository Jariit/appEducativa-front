// gestion-modulos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-modulos',
  templateUrl: './gestion-modulos.component.html',
  styleUrls: ['./gestion-modulos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class GestionModulosComponent implements OnInit {
  cursoId: number = 0;
  modulos: any[] = [];
  nuevoModulo = {
    titulo: '',
    descripcion: '',
    orden: 0
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.cursoId = +this.route.snapshot.paramMap.get('id')!;
    // Simulación de datos
    this.modulos = [
      { id: 1, titulo: 'Introducción', descripcion: 'Conceptos básicos', orden: 1 },
      { id: 2, titulo: 'Avanzado', descripcion: 'Temas complejos', orden: 2 }
    ];
  }

  agregarModulo() {
    const nuevoModulo = {
      ...this.nuevoModulo,
      id: this.modulos.length + 1
    };
    this.modulos.push(nuevoModulo);
    this.nuevoModulo = { titulo: '', descripcion: '', orden: 0 };
  }
}
