import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-noticias.component.html'
})
export class EditarNoticiasComponent implements OnInit {

  noticias: Noticia[] = [];
  
  // Variables de paginación
  page: number = 0;
  size: number = 6; // Mantener coherencia con la vista pública
  totalNoticias: number = 0;

  constructor(
    private noticiasService: NoticiasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticiasService.listarNoticias(this.page, this.size).subscribe(response => {
      this.noticias = response.content;
      this.totalNoticias = response.totalElements;
    });
  }

  // Métodos de navegación
  siguientePagina(): void {
    if (this.page + 1 < this.totalPaginas) {
      this.page++;
      this.cargarNoticias();
    }
  }

  anteriorPagina(): void {
    if (this.page > 0) {
      this.page--;
      this.cargarNoticias();
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.totalNoticias / this.size);
  }

  // Acciones de la tabla
  editar(id?: string) {
    if (!id) return;
    this.router.navigate(['/alta-noticia'], { queryParams: { id } });
  }

  borrar(id?: string) {
    if (!id) return;
    if (confirm("¿Seguro que quieres borrar esta noticia?")) {
      this.noticiasService.deleteNoticia(id).subscribe(() => {
        // Al borrar, recargamos la página actual por si la lista cambió significativamente
        this.cargarNoticias();
      });
    }
  }
}