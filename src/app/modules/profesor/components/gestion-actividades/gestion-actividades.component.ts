// gestion-actividades.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule]
})
export class GestionActividadesComponent implements OnInit {
  moduloId: number = 0;
  actividades: any[] = [];
  nuevaActividad = {
    titulo: '',
    tipo: 'lectura',
    descripcion: '',
    fechaLimite: ''
  };

  tiposActividad = [
    { value: 'lectura', label: 'Lectura' },
    { value: 'tarea', label: 'Tarea' },
    { value: 'examen', label: 'Examen' },
    { value: 'proyecto', label: 'Proyecto' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.moduloId = +this.route.snapshot.paramMap.get('id')!;
    // Simulación de datos
    this.actividades = [
      { id: 1, titulo: 'Introducción a conceptos', tipo: 'lectura', completada: false },
      { id: 2, titulo: 'Tarea práctica 1', tipo: 'tarea', fechaLimite: '2023-12-10', completada: true }
    ];
  }

  getIconoActividad(tipo: string): string {
    switch(tipo) {
      case 'lectura': return 'book';
      case 'tarea': return 'document-text';
      case 'examen': return 'school';
      case 'proyecto': return 'rocket';
      default: return 'help-circle';
    }
  }

  agregarActividad() {
    const nuevaActividad = {
      ...this.nuevaActividad,
      id: this.actividades.length + 1,
      completada: false
    };
    this.actividades.push(nuevaActividad);
    this.nuevaActividad = { titulo: '', tipo: 'lectura', descripcion: '', fechaLimite: '' };
  }
}
