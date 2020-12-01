import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meal'
})
export class MealPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
