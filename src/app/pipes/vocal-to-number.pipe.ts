import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocalToNumber'
})
export class VocalToNumberPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
