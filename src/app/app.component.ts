import { Component, inject } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sectionTitle = 'Inicio';
  private authService = inject(AuthService);
  userRole$ = this.authService.userRole$; // Observable para el HTML

  private titles: { [key: string]: string } = {
    '': 'Noticias',
    'nuestro-club': 'Nuestro Club',
    'escuelas': 'Escuelas',
    'sonoscape': 'Sonoscape',
    'contacto': 'Contacto',
    'acceso-miembros': 'Acceso Miembros',
    'alta-noticia': 'Alta Noticia',
    'editar-noticias': 'Editar Noticias'
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const tree = this.router.parseUrl(this.router.url);
        const path = tree.root.children['primary']?.segments.map(s => s.path).join('/') || '';

        if (path === 'alta-noticia' && tree.queryParams['id']) {
          this.sectionTitle = 'Edición Noticia';
          return;
        }
        this.sectionTitle = this.titles[path] || 'Inicio';
      });
  }

  logout() {
    this.authService.logout();
  }
}
