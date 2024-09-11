import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform( array : IProduct[]  , text : string): IProduct [] {

    return array.filter(  ( item )=> item.title.toLowerCase().includes( text.toLowerCase() )  );
  }

}
