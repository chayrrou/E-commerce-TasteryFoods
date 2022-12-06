import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  transform(totalPrice: number): string {
    return totalPrice * 0.30+"€";
  }

}
