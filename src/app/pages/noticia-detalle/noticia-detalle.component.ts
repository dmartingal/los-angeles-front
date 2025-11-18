import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticia-detalle.component.html'
})
export class NoticiaDetalleComponent implements OnInit {

  noticia?: Noticia;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    public router: Router   // ← cambiado a PUBLIC
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.noticiasService.getNoticiaById(id).subscribe({
        next: (res) => this.noticia = res,
        error: () => {
          alert('Noticia no encontrada');
          this.router.navigate(['/']);   // vamos al inicio donde están las noticias
        }
      });
    }
  }
}