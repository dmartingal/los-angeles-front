import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticia-alta',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './alta-noticia.component.html',
})
export class AltaNoticiaComponent {

  noticia: Partial<Noticia> & { fotoPrincipal?: File | null; fotosAdicionales?: File[] } = {
    titulo: '',
    descripcion: '',
    fotoPrincipal: null,
    fotosAdicionales: [],
    categoria: 'COMPETICIÓN',
    linkDetalle: ''
  };

  constructor(private noticiasService: NoticiasService) {}

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

    this.noticiasService.crearNoticia(noticiaParaEnviar).subscribe({
      next: (res) => {
        console.log('Noticia creada', res);
        alert('Noticia creada con éxito');
      },
      error: (err) => {
        console.error('Error al crear noticia', err);
        alert('Error al crear noticia');
      }
    });
  }
}
