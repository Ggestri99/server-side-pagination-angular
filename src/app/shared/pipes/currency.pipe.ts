import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyPipe implements PipeTransform {

    transform(value: number, currencySymbol: string = '$', decimalPlaces: number = 2): string {
        if (value == null) {
            return '';
        }
        return `${currencySymbol}${value.toFixed(decimalPlaces)}`;
    }

}