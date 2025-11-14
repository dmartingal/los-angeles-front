
export interface Noticia {
  id?: string; 
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  imagenesSecundarias: string[];
  linkDetalle: string;
  fecha?: string;
  categoria: 'Competición' | 'Escuela' | 'Eventos' | '';
}