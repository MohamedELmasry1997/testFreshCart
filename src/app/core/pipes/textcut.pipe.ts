import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textcut',
  standalone: true
})
export class TextcutPipe implements PipeTransform {

  transform(text: string): string {
    let newText = text.split(' ' , 2).join(' ')
    return newText ;
  }

}
