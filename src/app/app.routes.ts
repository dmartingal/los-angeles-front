import { Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NuestroClubComponent } from './pages/nuestro-club/nuestro-club.component';
import { EscuelasComponent } from './pages/escuelas/escuelas.component';
import { AltaNoticiaComponent } from './pages/alta-noticia/alta-noticia.component';
import { EditarNoticiasComponent } from './pages/editar-noticias/editar-noticias.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';

export const routes: Routes = [
  { path: '', component: NoticiasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nuestro-club', component: NuestroClubComponent },
  { path: 'escuelas', component: EscuelasComponent },
  { path: 'alta-noticia', component: AltaNoticiaComponent },
  { path: 'editar-noticias', component: EditarNoticiasComponent },
  { path: 'noticia/:id', component: NoticiaDetalleComponent }, 
  { path: '**', redirectTo: '' }
];