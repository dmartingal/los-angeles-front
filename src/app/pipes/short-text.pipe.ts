import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText',
  standalone: true
})
export class ShortTextPipe implements PipeTransform {
  transform(value: string, maxLength: number = 150): string {
    if (!value) return '';
    return value.length > maxLength ? value.slice(0, maxLength) + '…' : value;
  }
}