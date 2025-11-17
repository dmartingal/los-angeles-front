import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sectionTitle = 'Inicio';

private titles: { [key: string]: string } = {
    '': 'Noticias',
    'nuestro-club': 'Nuestro Club',
    'escuelas': 'Escuelas',
    'contacto': 'Contacto',
    'alta-noticia': 'Alta Noticia',
    'editar-noticias': 'Editar Noticias'
  };

  constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const tree = this.router.parseUrl(this.router.url);
      const path = tree.root.children['primary']?.segments.map(s => s.path).join('/') || '';

      // Si es alta-noticia y viene con id → edición
      if (path === 'alta-noticia' && tree.queryParams['id']) {
        this.sectionTitle = 'Edición Noticia';
        return;
      }

      // Caso normal
      this.sectionTitle = this.titles[path] || 'Inicio';
    });
}

}