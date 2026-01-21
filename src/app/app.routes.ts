import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

// Importación de componentes
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NuestroClubComponent } from './pages/nuestro-club/nuestro-club.component';
import { EscuelasComponent } from './pages/escuelas/escuelas.component';
import { AltaNoticiaComponent } from './pages/alta-noticia/alta-noticia.component';
import { EditarNoticiasComponent } from './pages/editar-noticias/editar-noticias.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';
import { LoginComponent } from './pages/login/login.component';
import { SonoscapeComponent } from './pages/sonoscape/sonoscape.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

// Guard de protección para Admin
const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();

  console.log('Navegando... Rol detectado por el Guard:', role);

  if (authService.getRole() === 'ADMIN') {
    return true;
  }
  return router.parseUrl('/acceso-miembros');
};

export const routes: Routes = [
  { path: '', component: NoticiasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nuestro-club', component: NuestroClubComponent },
  { path: 'escuelas', component: EscuelasComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'sonoscape', component: SonoscapeComponent },
  { path: 'noticia/:id', component: NoticiaDetalleComponent },
  { path: 'acceso-miembros', component: LoginComponent },

  // Rutas protegidas
  { 
    path: 'alta-noticia', 
    component: AltaNoticiaComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'editar-noticias', 
    component: EditarNoticiasComponent, 
    canActivate: [adminGuard] 
  },

  { path: '**', redirectTo: '' }
];
