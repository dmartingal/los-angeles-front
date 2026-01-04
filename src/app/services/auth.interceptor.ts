import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. EL CAMBIO: Mover el inject aquí arriba, al inicio
  const authService = inject(AuthService);
  const token = localStorage.getItem('auth_token');

  // Identificar si es una petición pública
  const esPublico = req.method === 'GET' && 
                   (req.url.includes('/api/noticias') || req.url.includes('/uploads'));

  // 2. MEJORA: Log para depurar qué está pasando con el PUT
  if (req.method === 'PUT' || req.method === 'POST') {
    console.log(`Interceptor: Procesando ${req.method} a ${req.url}`);
    console.log('Token presente:', !!token);
  }

  if (token && !esPublico) {
    // Clonamos la petición añadiendo el token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // 3. Si el servidor responde 403, imprimimos el detalle exacto
        if (error.status === 403) {
          console.error('Error 403: El servidor rechaza el token o el rol no es ADMIN.');
          console.error('Cuerpo del error del servidor:', error.error);
        }

        if (error.status === 401 || error.status === 403) {
          // Usamos la instancia de authService que inyectamos arriba
          authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};