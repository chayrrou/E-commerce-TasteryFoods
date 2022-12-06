import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dollar'
})
export class DollarPipe implements PipeTransform {

  transform(totalPrice: number): string {
    return "$"+totalPrice * 0.31;
  }

}
