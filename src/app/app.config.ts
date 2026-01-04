import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 

import { routes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor'; // Asegúrate de que la ruta sea correcta

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    
    // Configuramos el cliente HTTP con Fetch Y con nuestro Interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) 
    )
  ]
};