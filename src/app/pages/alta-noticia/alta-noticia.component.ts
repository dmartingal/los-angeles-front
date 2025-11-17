import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticia-alta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alta-noticia.component.html',
})
export class AltaNoticiaComponent implements OnInit {

  categorias: string[] = ['COMPETICIÓN', 'ESCUELA', 'EVENTOS','OTROS'];

  noticia: Partial<Noticia> & { fotoPrincipal?: File | null; fotosAdicionales?: File[] } = {
    titulo: '',
    descripcion: '',
    fotoPrincipal: null,
    fotosAdicionales: [],
    categoria: 'OTROS',
    linkDetalle: ''
  };

  modoEdicion = false;
  noticiaId?: string;

  constructor(
    private noticiasService: NoticiasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.modoEdicion = true;
        this.noticiaId = id;
        this.cargarNoticia(id);
      }
    });
    console.log('Categorías disponibles:', this.categorias);
  console.log('Valor inicial noticia.categoria:', this.noticia.categoria);
  }

  cargarNoticia(id: string) {
    this.noticiasService.getNoticiaById(id).subscribe(noticia => {
      this.noticia = {
        ...noticia,
        fotoPrincipal: null,
        fotosAdicionales: []
      };
    });
  }

  onFileChange(event: any, campo: 'fotoPrincipal' | 'fotosAdicionales') {
    const files: FileList = event.target.files;
    if (campo === 'fotoPrincipal') {
      this.noticia.fotoPrincipal = files[0] ?? null;
    } else {
      this.noticia.fotosAdicionales = Array.from(files);
    }
  }

  submitForm() {
    const noticiaParaEnviar = {
      ...this.noticia,
      fotoPrincipal: this.noticia.fotoPrincipal ?? undefined,
      fotosAdicionales: this.noticia.fotosAdicionales ?? undefined
    };

    if (this.modoEdicion && this.noticiaId) {
      this.noticiasService.updateNoticia(this.noticiaId, noticiaParaEnviar).subscribe({
        next: () => {
          alert('Noticia actualizada con éxito');
          this.router.navigate(['/editar-noticias']);
        },
        error: err => {
          console.error(err);
          alert('Error al actualizar la noticia');
        }
      });
    } else {
      this.noticiasService.crearNoticia(noticiaParaEnviar).subscribe({
        next: () => {
          alert('Noticia creada con éxito');
          this.router.navigate(['/editar-noticias']);
        },
        error: err => {
          console.error(err);
          alert('Error al crear noticia');
        }
      });
    }
  }
}
