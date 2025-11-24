import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText',
  standalone: true
})
export class ShortTextPipe implements PipeTransform {

  transform(value: string, maxLength: number = 150): string {
    if (!value) return '';

    // ⭐ 1) Convertir bloques HTML a saltos de línea
    let plain = value
      .replace(/<\/p>/gi, '\n')     // cada </p> = salto de línea
      .replace(/<br\s*\/?>/gi, '\n'); // <br> = salto de línea

    // ⭐ 2) Eliminar etiquetas HTML restantes
    plain = plain.replace(/<[^>]*>/g, '').trim();

    // ⭐ 3) Normalizar saltos extra
    plain = plain.replace(/\n{2,}/g, '\n');

    // ⭐ 4) Recortar
    return plain.length > maxLength
      ? plain.slice(0, maxLength) + '…'
      : plain;
  }

}