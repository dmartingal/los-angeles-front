export interface Noticia {
  id?: number;
  asunto: string;
  texto: string;
  fecha?: string;
  fotoPrincipal?: string;
  fotosAdicionales?: string[];
}