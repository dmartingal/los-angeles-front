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
    'alta-noticia': 'Alta Noticia'
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Obtiene la ruta sin el slash inicial
        const url = event.urlAfterRedirects.replace(/^\/+/, '');
        this.sectionTitle = this.titles[url] || 'Inicio';
      });
  }
}