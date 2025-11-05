import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule], 
  
  // Puedes usar 'template' y 'styles' en lugar de 'templateUrl' y 'styleUrl' 
  // si prefieres mantener todo en un solo archivo (práctica común en Standalone)
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
  
  standalone: true, // Asegura que el componente sea Standalone
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NoticiasComponent {

  noticias: Noticia[] = [];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes llamar a un servicio para cargar las noticias desde una API
    // Por ahora, cargaremos datos de ejemplo
    this.cargarNoticiasEjemplo();
  }

 /**
   * Carga una lista de noticias de ejemplo para demostración,
   * respetando la estructura de la interfaz Noticia.
   */
  cargarNoticiasEjemplo(): void {
    this.noticias = [
      {
        id: '1001', // Nuevo: Incluimos el ID
        titulo: 'Victoria Inesperada en el Torneo Regional',
        descripcion: 'Nuestro equipo senior se alzó con la copa tras un emocionante partido final, demostrando garra y estrategia hasta el último minuto.',
        fecha: '15 de Mayo de 2025',
        categoria: 'Competición',
        imagenUrl: 'https://picsum.photos/seed/competicion1/600/338',
        linkDetalle: '#detalle-competicion-1',
        // Nuevo: Array de imágenes secundarias
        imagenesSecundarias: [
          'https://picsum.photos/seed/competicion1-a/800/600',
          'https://picsum.photos/seed/competicion1-b/800/600'
        ]
      },
      {
        id: '1002',
        titulo: 'Inscripciones Abiertas para el Campamento de Verano',
        descripcion: '¡Vuelven nuestros campamentos! Una oportunidad única para aprender, mejorar habilidades y hacer nuevos amigos en un ambiente deportivo.',
        fecha: '01 de Junio de 2025',
        categoria: 'Escuela',
        imagenUrl: 'https://picsum.photos/seed/escuela1/600/338',
        linkDetalle: '#detalle-escuela-1',
        imagenesSecundarias: [] // Puede ser un array vacío si no hay más imágenes
      },
      {
        id: '1003',
        titulo: 'Gran Gala Anual de Premios del Club',
        descripcion: 'Celebraremos los éxitos de la temporada con nuestra tradicional cena y entrega de galardones a los jugadores más destacados.',
        fecha: '20 de Diciembre de 2024',
        categoria: 'Eventos',
        imagenUrl: 'https://picsum.photos/seed/eventos1/600/338',
        linkDetalle: '#detalle-eventos-1',
        imagenesSecundarias: [
          'https://picsum.photos/seed/eventos1-a/800/600'
        ]
      },
      {
        id: '1004',
        titulo: 'Clasificación a la Liga Nacional Junior',
        descripcion: 'El equipo juvenil ha asegurado su pase a la fase final de la liga tras una racha impecable de diez victorias consecutivas.',
        fecha: '10 de Mayo de 2025',
        categoria: 'Competición',
        imagenUrl: 'https://picsum.photos/seed/competicion2/600/338',
        linkDetalle: '#detalle-competicion-2',
        imagenesSecundarias: []
      }
    ];
  }
}
