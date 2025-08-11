// actividad-detalle.component.ts (versión completa)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { EstudianteService } from '../../services/estudiante.service';
import { saveAs } from 'file-saver';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class ActividadDetalleComponent {


  activities = [
    // ===== MATEMÁTICAS AVANZADAS =====
    // --- Álgebra Lineal ---
    {
      id: 1,
      moduleId: 1,
      title: 'Introducción a vectores',
      type: 'lecture',
      description: 'En esta lección exploraremos los conceptos fundamentales de los vectores en espacios euclidianos, incluyendo su definición, propiedades básicas y representación geométrica. Aprenderás a realizar operaciones vectoriales como suma, resta y producto escalar, con aplicaciones prácticas en física e ingeniería.',
      duration: '30 min',
      resources: 3,
      completed: true,
      content: 'Los vectores son elementos fundamentales en álgebra lineal que representan magnitud y dirección. En este módulo estudiaremos:\n\n- Definición y propiedades\n- Operaciones básicas (suma, resta, producto escalar)\n- Aplicaciones geométricas\n- Representación matricial\n- Vectores unitarios y bases vectoriales',
      attachments: [
        { name: 'Teoria_Vectores.pdf', type: 'pdf', size: '2.1 MB' },
        { name: 'Ejercicios_Resueltos.docx', type: 'word', size: '1.5 MB' }
      ]
    },
    {
      id: 2,
      moduleId: 1,
      title: 'Ejercicios prácticos',
      type: 'assignment',
      description: 'Serie de problemas diseñados para aplicar los conceptos teóricos sobre vectores. Cada ejercicio debe resolverse mostrando todo el procedimiento paso a paso, con especial atención al razonamiento matemático y la claridad en la presentación de resultados.',
      instructions: 'Resolver los siguientes problemas mostrando todo el procedimiento:\n\n1. Calcular el producto punto entre los vectores A(3, -2, 5) y B(1, 4, -1)\n2. Hallar el ángulo entre los vectores C(2, 2) y D(-1, 1)\n3. Demostrar la propiedad distributiva del producto vectorial\n4. Encontrar un vector unitario en la dirección de E(4, -3)\n5. Resolver el sistema de ecuaciones vectoriales dado',
      dueDate: '2023-12-15',
      completed: true,
      score: 95,
      attachments: [
        { name: 'Problemas_Algebra.pdf', type: 'pdf', size: '1.8 MB' }
      ]
    },
    {
      id: 3,
      moduleId: 1,
      title: 'Matrices y determinantes',
      type: 'lecture',
      description: 'Profundizaremos en el estudio de matrices, sus operaciones y propiedades, con especial énfasis en el cálculo de determinantes y su interpretación geométrica. Esta lección sienta las bases para temas avanzados como diagonalización y sistemas de ecuaciones lineales.',
      duration: '45 min',
      resources: 2,
      completed: true,
      content: 'Las matrices son arreglos rectangulares de números con aplicaciones en:\n\n- Sistemas de ecuaciones\n- Transformaciones lineales\n- Gráficos por computadora\n- Criptografía\n- Procesamiento de señales\n\nTemas cubiertos:\n- Tipos de matrices\n- Operaciones básicas\n- Determinantes y sus propiedades\n- Matriz inversa\n- Rango de una matriz',
      videoUrl: 'https://www.youtube.com/watch?v=ZK3O402wf1c'
    },
    {
      id: 4,
      moduleId: 1,
      title: 'Proyecto final',
      type: 'project',
      description: 'Trabajo aplicado donde deberás seleccionar un problema del mundo real y resolverlo utilizando los conceptos de álgebra lineal aprendidos durante el módulo. El proyecto debe incluir una explicación clara del problema, el desarrollo matemático completo y una conclusión que destaque las aplicaciones prácticas de los conceptos utilizados.',
      instructions: 'Seleccionar un problema aplicado y resolverlo usando los conceptos aprendidos. Incluir:\n\n1. Portada con título y datos del estudiante\n2. Introducción explicando el problema\n3. Desarrollo matemático completo\n4. Implementación computacional (opcional)\n5. Conclusiones y aplicaciones\n6. Bibliografía\n\nExtensión mínima: 5 páginas\nFecha límite: 20 de diciembre',
      dueDate: '2023-12-20',
      completed: true,
      score: 90,
      attachments: [
        { name: 'Guia_Proyecto.pdf', type: 'pdf', size: '3.2 MB' },
        { name: 'Ejemplos_Proyectos.zip', type: 'zip', size: '4.5 MB' }
      ]
    },

    // --- Cálculo Diferencial ---
    {
      id: 5,
      moduleId: 2,
      title: 'Introducción a límites',
      type: 'lecture',
      description: 'Primera aproximación al concepto fundamental de límite en cálculo, explorando su definición formal (épsilon-delta) y su interpretación intuitiva. Analizaremos continuidad, asíntotas y los diferentes tipos de límites (laterales, infinitos y en el infinito).',
      duration: '35 min',
      resources: 2,
      completed: true,
      content: 'El límite es un concepto fundamental que describe el comportamiento de una función cuando su variable independiente tiende a un valor particular.\n\nTemas cubiertos:\n- Definición intuitiva\n- Definición formal (ε-δ)\n- Límites laterales\n- Continuidad\n- Teoremas fundamentales\n- Límites infinitos\n- Asíntotas verticales y horizontales',
      attachments: [
        { name: 'Limites_Teoria.pdf', type: 'pdf', size: '1.5 MB' },
        { name: 'Ejemplos_Limites.pptx', type: 'ppt', size: '2.3 MB' }
      ]
    },
    {
      id: 6,
      moduleId: 2,
      title: 'Definición de derivada',
      type: 'lecture',
      description: 'Exploración del concepto de derivada como límite del cociente incremental, incluyendo su interpretación geométrica como pendiente de la recta tangente y su significado físico como razón de cambio instantánea. Se cubrirán las reglas básicas de derivación.',
      duration: '40 min',
      resources: 3,
      completed: true,
      content: 'La derivada representa la tasa de cambio instantánea de una función. Cubriremos:\n\n- Definición formal como límite\n- Interpretación geométrica\n- Derivadas laterales\n- Continuidad vs diferenciabilidad\n- Reglas básicas de derivación:\n  * Regla de la constante\n  * Regla de la potencia\n  * Regla de la suma\n  * Regla del producto\n  * Regla del cociente',
      interactiveDemo: true
    },
    {
      id: 7,
      moduleId: 2,
      title: 'Ejercicios de derivación',
      type: 'assignment',
      description: 'Práctica intensiva de técnicas de derivación con funciones algebraicas, trigonométricas y compuestas. Cada ejercicio debe resolverse aplicando metódicamente las reglas de derivación aprendidas, identificando claramente qué regla se aplica en cada paso.',
      instructions: 'Derivar las siguientes funciones aplicando las reglas aprendidas:\n\n1. Funciones polinómicas básicas\n2. Funciones con raíces y exponentes racionales\n3. Funciones trigonométricas directas e inversas\n4. Funciones compuestas (regla de la cadena)\n5. Funciones implícitas\n6. Derivación logarítmica\n\nMostrar todos los pasos intermedios\nEntrega en formato PDF o documento escaneado',
      dueDate: '2023-12-18',
      completed: false,
      attachments: [
        { name: 'Problemas_Derivadas.pdf', type: 'pdf', size: '2.0 MB' },
        { name: 'Formulario_Derivadas.pdf', type: 'pdf', size: '0.8 MB' }
      ]
    },

    // ===== PROGRAMACIÓN EN JAVASCRIPT =====
    // --- Fundamentos ---
    {
      id: 9,
      moduleId: 3,
      title: 'Introducción a JavaScript',
      type: 'lecture',
      description: 'Visión general del lenguaje JavaScript: historia, características principales, entornos de ejecución y herramientas básicas de desarrollo. Comparación con otros lenguajes y discusión sobre su papel en el desarrollo web moderno.',
      duration: '25 min',
      resources: 2,
      completed: true,
      content: 'JavaScript es un lenguaje de programación interpretado, orientado a objetos y multiplataforma.\n\nCaracterísticas clave:\n- Tipado dinámico\n- Funciones de primera clase\n- Prototype-based OOP\n- Single-threaded con event loop\n- Compatibilidad con todos los navegadores\n\nEntornos de ejecución:\n- Navegadores web\n- Node.js\n- Deno\n- Bun\n\nHerramientas:\n- Editores de código\n- Consola del navegador\n- Node REPL',
      videoUrl: 'https://youtu.be/Q9fwkpxr3Dw?si=Uz3pKNOhy4Jf0DhR'
    },
    {
      id: 10,
      moduleId: 3,
      title: 'Variables y tipos de datos',
      type: 'lecture',
      description: 'Profundización en el sistema de tipos de JavaScript, declaración de variables (var, let, const) y los diferentes tipos de datos primitivos. Se incluyen ejemplos prácticos de conversión entre tipos y coerción automática.',
      duration: '30 min',
      resources: 3,
      completed: true,
      content: 'JavaScript tiene 7 tipos de datos primitivos:\n\n1. String: representa texto\n2. Number: valores numéricos (enteros y decimales)\n3. Boolean: true/false\n4. Null: valor nulo intencional\n5. Undefined: variable no inicializada\n6. Symbol: identificador único\n7. BigInt: números enteros muy grandes\n\nDeclaración de variables:\n- var: ámbito de función (hoisting)\n- let: ámbito de bloque\n- const: constante (ámbito de bloque)\n\nConversión de tipos:\n- Coerción implícita\n- Métodos parseInt(), parseFloat()\n- Operadores +, !!',
      codeExamples: [
        'let nombre = "Juan"; // String\nconst edad = 25; // Number\nvar esEstudiante = true; // Boolean\n\n// Conversión de tipos\nlet numeroComoTexto = "123";\nlet numeroReal = parseInt(numeroComoTexto); // 123\n\n// Coerción automática\nconsole.log("5" + 3); // "53" (concatenación)\nconsole.log("5" - 3); // 2 (resta)'
      ]
    },
    {
      id: 11,
      moduleId: 3,
      title: 'Ejercicios de práctica',
      type: 'assignment',
      description: 'Primera serie de ejercicios prácticos con JavaScript, diseñados para familiarizarse con la sintaxis básica, declaración de variables y operaciones elementales. Los ejercicios progresan desde lo más simple hasta problemas que requieren combinación de conceptos.',
      instructions: 'Crear scripts que:\n\n1. Declaren variables de diferentes tipos (mostrar con console.log)\n2. Realicen operaciones aritméticas básicas\n3. Combinen strings (concatenación y template literals)\n4. Practiquen conversión entre tipos\n5. Implementen cálculos simples (áreas, promedios, etc.)\n\nRequisitos:\n- Usar tanto let como const\n- Incluir comentarios explicativos\n- Probar el código en la consola del navegador\n- Entregar archivo .js o enlace a CodePen/JSFiddle',
      dueDate: '2023-12-10',
      completed: true,
      score: 88,
      codingEnvironment: true
    },

    // --- Funciones y Scope ---
    {
      id: 12,
      moduleId: 4,
      title: 'Declaración de funciones',
      type: 'lecture',
      description: 'Exploración detallada de las diferentes formas de definir funciones en JavaScript, incluyendo sus diferencias sutiles en comportamiento (hoisting, ámbito this). Se cubren funciones nombradas, anónimas y expresiones de función.',
      duration: '35 min',
      resources: 2,
      completed: true,
      content: 'En JavaScript existen varias formas de declarar funciones:\n\n1. Function declaration:\n   - Hoisted (puede llamarse antes de declararse)\n   - Tiene su propio ámbito this\n\n2. Function expression:\n   - Asignada a una variable\n   - No hoisted\n   - Puede ser anónima\n\n3. Arrow function (ES6+):\n   - Sintaxis concisa\n   - Lexical this (hereda el this del contexto)\n   - Siempre anónimas\n   - No tienen arguments\n\nEjemplos avanzados:\n- Funciones inmediatamente invocadas (IIFE)\n- Funciones generadoras\n- Funciones asíncronas',
      codeExamples: [
        '// Function declaration\nfunction suma(a, b) {\n  return a + b;\n}',

        '// Function expression\nconst resta = function(a, b) {\n  return a - b;\n};',

        '// Arrow function\nconst multiplicacion = (a, b) => a * b;',

        '// IIFE\n(function() {\n  console.log("Ejecución inmediata");\n})();'
      ]
    },
    {
      id: 13,
      moduleId: 4,
      title: 'Arrow functions',
      type: 'lecture',
      description: 'Enfoque profundo en las arrow functions introducidas en ES6, destacando sus diferencias con las funciones tradicionales, casos de uso preferentes y posibles trampas. Incluye ejemplos prácticos de su uso con métodos de array como map, filter y reduce.',
      duration: '20 min',
      resources: 1,
      completed: true,
      content: 'Las arrow functions introducidas en ES6 tienen características distintivas:\n\n- Sintaxis concisa (pueden omitir {} y return para expresiones simples)\n- Lexical this (no tienen su propio this, lo heredan del contexto)\n- No pueden usarse como constructores (no tienen propiedad prototype)\n- No tienen objeto arguments\n\nCasos de uso ideales:\n- Callbacks concisos\n- Métodos de array (map, filter, reduce)\n- Funciones que preservan el contexto\n\nEjemplo con métodos de array:\nconst numeros = [1, 2, 3];\nconst cuadrados = numeros.map(n => n * n); // [1, 4, 9]',
      interactiveExample: true
    },
    {
      id: 14,
      moduleId: 4,
      title: 'Ejercicio de funciones',
      type: 'assignment',
      description: 'Serie de problemas que requieren implementar diversas funciones en JavaScript, desde cálculos matemáticos básicos hasta manipulaciones de strings más complejas. Se evalúa claridad del código, uso apropiado de parámetros y valores de retorno.',
      instructions: 'Crear funciones para:\n\n1. Calcular factorial de un número\n2. Verificar si una palabra es palíndromo\n3. Generar secuencia Fibonacci hasta n términos\n4. Convertir temperatura entre Celsius y Fahrenheit\n5. Contar vocales en un string\n6. Implementar una calculadora básica (sumar, restar, etc.)\n\nRequisitos:\n- Usar diferentes tipos de declaración de funciones\n- Incluir manejo básico de errores\n- Probar cada función con diferentes valores\n- Documentar con comentarios JSDoc',
      dueDate: '2023-12-17',
      completed: false,
      codingEnvironment: true
    }
  ];

  activity: any;
  submissionText = '';

  constructor(
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    private estudianteService: EstudianteService,
    private sanitizer: DomSanitizer// Inyectar el servicio
  ) {
    this.route.params.subscribe(params => {
      const activityId = +params['id'];
      this.activity = this.activities.find(a => a.id === activityId);
    });
  }



  getFileIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'pdf': 'document-text-outline',
      'word': 'document-text-outline',
      'image': 'image-outline',
      'video': 'videocam-outline',
      'code': 'code-slash-outline',
      'zip': 'archive-outline'
    };
    return icons[type] || 'document-outline';
  }

  getModuleRoute(): string {
    return `/estudiante/modulo/${this.activity?.moduleId}`;
  }

   async descargarRecurso(file: any, previsualizar: boolean = false): Promise<void> {
    try {
      const tipo = 'materiales'; // O 'entregas' según corresponda

      if (previsualizar) {
        this.estudianteService.obtenerArchivo(tipo, file.name, true).subscribe({
          next: () => console.log('Archivo abierto para previsualización'),
          error: (err) => console.error('Error al previsualizar:', err)
        });
      } else {
        this.estudianteService.obtenerArchivo(tipo, file.name).subscribe({
          next: (response) => {
            saveAs(response.body, file.name);
            console.log('Archivo descargado con éxito');
          },
          error: (err) => console.error('Error al descargar:', err)
        });
      }
    } catch (err) {
      console.error('Error inesperado:', err);
    }
  }

  // Método para subir una entrega
  async subirEntrega(archivos: FileList | null): Promise<void> {
    if (!archivos || archivos.length === 0) return;

    try {
      const filesArray = Array.from(archivos);
      this.estudianteService.subirEntrega(this.activity.id, filesArray).subscribe({
        next: (response) => {
          console.log('Entrega subida con éxito', response);
          // Actualizar el estado de la actividad
          this.activity.completed = true;
          this.activity.submissionDate = new Date().toISOString();
        },
        error: (err) => console.error('Error al subir entrega:', err)
      });
    } catch (err) {
      console.error('Error al procesar archivos:', err);
    }
  }
  // En actividad-detalle.component.ts
puedePrevisualizar(nombreArchivo: string): boolean {
  const extension = nombreArchivo.split('.').pop()?.toLowerCase();
  return ['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(extension || '');
}

submitAssignment() {
  if (this.submissionText.trim()) {
    this.activity.completed = true;
    this.activity.submissionDate = new Date().toISOString();
    // Aquí podrías llamar al servicio para guardar el texto también
  }
}


  abrirEjemploInteractivo() {
    // URL de ejemplo para el entorno interactivo
    window.open('https://jsfiddle.net/', '_blank');
  }

  copiarCodigo(codigo: string) {
    this.clipboard.copy(codigo);
    // Aquí deberíamos mostrar algún toast/notificación de que se copió
    console.log('Código copiado al portapapeles');
  }
    /**
   * Verifica si una URL es de YouTube
   */
  isYouTubeUrl(url: string): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  /**
   * Obtiene una URL segura para el iframe de YouTube
   */
  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    if (!url) return '';

    // Convertir diferentes formatos de URL de YouTube a formato embed
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }

    const safeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
  }

  /**
   * Método para abrir videos que no son de YouTube
   */
  verVideo() {
    if (this.activity?.videoUrl) {
      window.open(this.activity.videoUrl, '_blank');
    }
  }



}
