import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocalToNumber'
})
export class VocalToNumberPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/a/gi, '4')
                .replace(/e/gi, '3')
                .replace(/i/gi, '1')
                .replace(/o/gi, '0')
                .replace(/u/gi, '12');
  }
}
