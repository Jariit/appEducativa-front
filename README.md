# 📘 Proyecto: App Educativa

## 📦 Tecnologías

- Frontend: Angular
- Backend: Node.js + Express
- Base de Datos: PostgreSQL
  
  
## Tecnologías Usadas en el Frontend (`APPEDUCATIVA`)

| Categoría               | Tecnología / Herramienta         | Descripción                                                                 |
|------------------------|----------------------------------|-----------------------------------------------------------------------------|
| **Framework principal**| **Angular**                      | Framework para construir aplicaciones web SPA con arquitectura modular.    |
| **Lenguaje base**      | **TypeScript**                   | Superset de JavaScript con tipado estático, usado en Angular.              |
| **Componentes UI**     | **Angular Material (opcional)**  | Biblioteca de componentes de interfaz (botones, cards, formularios, etc.)* |
| **Estilos CSS**        | **SCSS / CSS**                   | Usado para estilos personalizados en componentes.                          |
| **Manejo de rutas**    | **Angular Router**               | Sistema de navegación entre vistas y módulos.                              |
| **Gestión de estado**  | **@Input/@Output - Services**    | Comunicación entre componentes e inyección de servicios.                   |
| **Módulos**            | **NgModules**                    | Organización modular (auth, estudiante, profesor, etc.).                   |
| **Consumo de APIs**    | **HttpClientModule**             | Cliente HTTP de Angular para conectarse con el backend.                    |
| **Formularios**        | **ReactiveForms / FormsModule**  | Para crear formularios reactivos y controlados.                            |
| **Interacción modal**  | **Modales personalizados**       | Componentes como `crear-curso-modal`, `editar-actividad-modal`, etc.       |
| **Gestión de servicios**| **Angular Services**            | Para lógica de negocio, comunicación con API, y compartición de datos.     |
| **Shared Module**      | **shared/**                      | Contiene componentes, directivas o pipes reutilizables.                    |

## 📁 Estructura General

- `/src`: Código fuente
- `/app/modules`: Módulos Angular por rol
- `/shared`: Componentes compartidos

# 🌐 FRONTEND - Angular

## 📁 Módulos

- `auth`: Login y registro.
- `profesor`: Vista y control de cursos.
- `estudiante`: Actividades, entregas.

## 🔄 Servicios

- `/services/usuario.service.ts`: Manejo de sesiones.
- `/services/curso.service.ts`: Peticiones al backend de cursos.

## 🔗 Enrutamiento

- `app-routing.module.ts`: Módulo central de rutas.
  - `/login`, `/registro`
  - `/profesor/cursos`
  - `/estudiante/actividades`

## 🧩 Shared

Componentes reutilizables como headers, footers, pipes.

## 🎨 Theme

- Archivos SCSS globales y variables (`variables.scss`).

