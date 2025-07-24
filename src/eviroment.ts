// src/environments/environment.ts
export const environment = {

   apiUrl: 'http://localhost:3000',
  //  production: false,
  // Asegúrate que coincida con el puerto de tu backend
  defaultTimeout: 5000, // Tiempo de espera para las peticiones HTTP en milisegundos
  authTokenKey: 'educativa_token', // Clave para almacenar el token en localStorage
  userDataKey: 'educativa_user', // Clave para almacenar datos de usuario
  roles: {
    student: 'estudiante',
    teacher: 'profesor',
    admin: 'admin'
  }
};
