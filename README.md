# 📘 Proyecto: App Educativa

## 📦 Tecnologías

- Frontend: Angular
- Backend: Node.js + Express
- Base de Datos: PostgreSQL
- ORM/ODM: (Si usas Sequelize, Mongoose, etc.)

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

