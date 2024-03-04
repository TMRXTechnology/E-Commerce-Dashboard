// currency-format.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return '';
    }

    // Formata o valor para moeda brasileira (BRL) e substitui o ponto por vírgula
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('.', ',');
  }
}
