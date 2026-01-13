import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor'; // Asegúrate de que la ruta sea correcta

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    
    // Configuramos el cliente HTTP con Fetch Y con nuestro Interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) 
    )
  ]
};