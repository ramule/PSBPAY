import { Pipe, PipeTransform } from '@angular/core';
declare var OSREC: any;
@Pipe({ name: "customcurrency" })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: any, type: any): string {
    console.log("customcurrency type", type)
    if (value && type != undefined && type == 'symbol') {
      return " " + OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '₹' });
    }else if (value && type != undefined && type == 'noDecimal') {
      let inr = value.replace(/[^0-9]+/g,'')
      let formattedINR =" " + OSREC.CurrencyFormatter.format(inr, { currency: 'INR', symbol: '' })
      console.log(formattedINR);
      return formattedINR;
    }else if (value && type != undefined && type == 'decimal') {
      let updatedValue = value.replace(/[^.0-9]+/g,'')
      let formattedINR =" " + OSREC.CurrencyFormatter.format(updatedValue, { currency: 'INR', symbol: '' })
      console.log(formattedINR);
      return formattedINR;
    } else if (value) {
      return " " + OSREC.CurrencyFormatter.format(value, { currency: 'INR', symbol: '' });
    }
    else {
      return value;
    }
  }

}


@Pipe({name: 'unique'})
  export class FilterPipe implements PipeTransform
{

  transform(value: any, id?: any): any {

    // Remove the duplicate elements (this will remove duplicates
    let uniqueArray = value.filter(function (el : any) {
      return el.ID != id;
    });

  return uniqueArray;   }
}


@Pipe({ name: "dynamicurrency" })
export class DynamicCurrencyPipe implements PipeTransform {
  transform(value: any , currency:any ): any {
    // console.log("Dynamiccurrency type", type)
    if (value) {
      return " " + OSREC.CurrencyFormatter.format(value, { currency: currency, symbol: '₹' });
    }

  }

}
