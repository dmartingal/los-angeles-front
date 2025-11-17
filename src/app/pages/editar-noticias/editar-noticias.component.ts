import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../models/noticia.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-noticias',
  standalone: true,   // ⬅⬅⬅ MUY IMPORTANTE
  imports: [CommonModule],  // ⬅⬅⬅ Aquí vienen *ngFor, *ngIf, etc.
  templateUrl: './editar-noticias.component.html'
})
export class EditarNoticiasComponent implements OnInit {

  noticias: Noticia[] = [];

  constructor(
    private noticiasService: NoticiasService,
    private router: Router
  ) {}

  ngOnInit() {
     this.noticiasService.listarNoticias().subscribe(response => {
      this.noticias = response.content;  // El backend devuelve {content, totalElements}
    });
  }

  editar(id?: string) {
    if (!id) return; // por si acaso
    this.router.navigate(['/alta-noticia'], { queryParams: { id } });
  }

  borrar(id?: string) {
    if (!id) return;
    if (confirm("¿Seguro que quieres borrar esta noticia?")) {
      this.noticiasService.deleteNoticia(id).subscribe(() => {
        this.noticias = this.noticias.filter(n => n.id !== id);
      });
    }
  }

}