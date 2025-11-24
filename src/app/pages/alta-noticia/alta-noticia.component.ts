import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor'; // ⬅️ CAMBIO: Importamos ngx-editor

@Component({
  selector: 'app-noticia-alta',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxEditorModule], // ⬅️ CAMBIO: Módulo de ngx-editor
  templateUrl: './alta-noticia.component.html',
})
export class AltaNoticiaComponent implements OnInit, OnDestroy {

  categorias: string[] = ['COMPETICIÓN', 'ESCUELA', 'EVENTOS', 'OTROS'];

  editor!: Editor; // ⬅️ CAMBIO: Instancia del editor
  
  // ⬅️ CAMBIO: Configuración de toolbar para ngx-editor
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

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
    public router: Router
  ) {}

  ngOnInit() {
    this.editor = new Editor(); // ⬅️ CAMBIO: Inicializamos el editor al arrancar

    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      if (id) {
        // MODO EDICIÓN
        this.modoEdicion = true;
        this.noticiaId = id;
        this.cargarNoticia(id);
      } else {
        // MODO ALTA
        this.modoEdicion = false;
        this.noticiaId = undefined;
        this.resetFormulario();
      }
    });
  }

  // ⬅️ CAMBIO: Muy importante destruir el editor al salir
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
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
    if (files.length > 0) {
       if (campo === 'fotoPrincipal') {
        this.noticia.fotoPrincipal = files[0];
      } else {
        // Convertimos FileList a Array
        this.noticia.fotosAdicionales = Array.from(files);
      }
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

  resetFormulario() {
    this.noticia = {
      titulo: '',
      descripcion: '',
      fotoPrincipal: null,
      fotosAdicionales: [],
      categoria: 'OTROS',
      linkDetalle: ''
    };
  }
}