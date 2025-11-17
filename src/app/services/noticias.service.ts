import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root' // ✅ Servicio singleton, accesible desde cualquier componente
})
export class NoticiasService {

  private apiUrl = 'http://localhost:8080/api/noticias';

  constructor(private http: HttpClient) {}

  crearNoticia(noticia: Partial<Noticia> & { fotoPrincipal?: File, fotosAdicionales?: File[] }): Observable<Noticia> {
    const formData = new FormData();

    formData.append('titulo', noticia.titulo ?? '');
    formData.append('descripcion', noticia.descripcion ?? '');

    if (noticia.fotoPrincipal) {
      formData.append('fotoPrincipal', noticia.fotoPrincipal);
    }

    if (noticia.fotosAdicionales?.length) {
      noticia.fotosAdicionales.forEach(foto => formData.append('fotosAdicionales', foto));
    }

    return this.http.post<Noticia>(this.apiUrl, formData);
  }

  listarNoticias(page: number = 0, size: number = 6): Observable<{ content: Noticia[], totalElements: number }> {
    return this.http.get<{ content: Noticia[], totalElements: number }>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  getNoticiaById(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/${id}`);
  }

  updateNoticia(id: string, noticia: Partial<Noticia> & { fotoPrincipal?: File, fotosAdicionales?: File[] }): Observable<Noticia> {
    const formData = new FormData();

    formData.append('titulo', noticia.titulo ?? '');
    formData.append('descripcion', noticia.descripcion ?? '');
    formData.append('categoria', noticia.categoria ?? '');
    formData.append('linkDetalle', noticia.linkDetalle ?? '');

    if (noticia.fotoPrincipal) {
      formData.append('fotoPrincipal', noticia.fotoPrincipal);
    }

    if (noticia.fotosAdicionales?.length) {
      noticia.fotosAdicionales.forEach(foto => formData.append('fotosAdicionales', foto));
    }

    return this.http.put<Noticia>(`${this.apiUrl}/${id}`, formData);
  }

  deleteNoticia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}