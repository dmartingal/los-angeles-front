import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';
import { ShortTextPipe } from '../../pipes/short-text.pipe';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, ShortTextPipe, RouterModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  totalNoticias: number = 0;

  page: number = 0; // Página actual (0-indexed)
  size: number = 6; // Noticias por página

  constructor(private noticiasService: NoticiasService,private router: Router) { }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(page: number = this.page, size: number = this.size): void {
    this.noticiasService.listarNoticias(page, size).subscribe({
      next: (res) => {
        this.noticias = res.content;
        this.totalNoticias = res.totalElements;
        this.page = page;
      },
      error: (err) => {
        console.error('Error al cargar noticias desde el back', err);
      }
    });
  }

  // TrackBy para optimizar renderizado
  trackById(index: number, noticia: Noticia): string | number {
  return noticia.id ?? index;
  }

  // Pasa a la página siguiente
  siguientePagina(): void {
    const totalPaginas = Math.ceil(this.totalNoticias / this.size);
    if (this.page + 1 < totalPaginas) {
      this.cargarNoticias(this.page + 1, this.size);
    }
  }

  // Pasa a la página anterior
  anteriorPagina(): void {
    if (this.page > 0) {
      this.cargarNoticias(this.page - 1, this.size);
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalNoticias / this.size);
  }

  verDetalle(id?: string) {
  if (!id) return;
  this.router.navigate(['/noticia', id]);
}
}
