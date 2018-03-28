import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(tel) {
    if (!tel) { return tel; }
    const value = tel.toString().replace(/\D+/g, '');
    const len = value.length;
    let out = '';
    if (len > 0) { out = '(' + value.slice(0, 3) + ') '; }
    if (len > 3) { out += value.slice(3, 6); }
    if (len > 6) { out += ' - ' + value.slice(6); }
    return out;
  }
}
