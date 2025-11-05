import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoticiaForm } from '../models/noticia-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private apiUrl = 'http://localhost:8080/api/noticias'; // Ajusta la URL según tu back

  constructor(private http: HttpClient) {}

  crearNoticia(noticia: NoticiaForm): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', noticia.titulo);
    formData.append('descripcion', noticia.descripcion);

    if (noticia.fotoPrincipal) {
      formData.append('fotoPrincipal', noticia.fotoPrincipal);
    }

    if (noticia.fotosAdicionales && noticia.fotosAdicionales.length > 0) {
      noticia.fotosAdicionales.forEach((foto, index) => {
        formData.append('fotosAdicionales', foto);
      });
    }

    return this.http.post(this.apiUrl, formData);
  }
}