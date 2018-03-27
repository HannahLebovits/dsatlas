import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe {
  transform(tel, args) {
    if (!tel) { return tel; }
    return '(' + tel.slice(0, 2) + ') ' + tel.slice(3, 5) + '-' + tel.slice(6, 9);
  }
}