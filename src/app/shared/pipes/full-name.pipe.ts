import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';

@Pipe({
  name: 'fullName',
  standalone: false
})

export class FullNamePipe implements PipeTransform {
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  transform(value: Student, ...args: unknown[]): unknown {
    return `${value.lastName.toUpperCase()}, ${this.capitalizeFirstLetter(value.name)}`;
  }
}



