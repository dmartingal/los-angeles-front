import { Noticia } from './noticia.model';

/**
 * Define la estructura de datos que se usa TEMPORALMENTE en el formulario de alta de noticias
 * antes de la subida de archivos y el guardado en la BBDD.
 *
 * NOTA: Esta interfaz extiende Noticia, pero sobrescribe los campos de imagen
 * para usar objetos File (archivos físicos subidos por el administrador).
 */
export interface NoticiaForm extends Omit<Noticia, 'imagenUrl' | 'imagenesSecundarias'> {
  // id, titulo, descripcion, linkDetalle, fecha, categoria se heredan

  // 1. Imagen Principal: Usamos File para la subida
  fotoPrincipal: File | null;
  // 2. Imágenes Adicionales: Usamos un array de File para las secundarias
  fotosAdicionales: File[];
}