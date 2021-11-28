// Formatting date DDMMYYYY to DD/MM/YYYY
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "formatDate" })

export class FormatDatePipe implements PipeTransform {
  transform(date : any ): string {
      if(date) {
          let formatedDate = date.slice(0, 2) + '/' + date.slice(2, 4) + '/' + date.slice(4);
          return formatedDate;
      } else {
          return date;
      }
  }

  transformDateForIos(date : any): string {
      let formattedDate = date ? date.replace(/-/g, "/"): "";
      return formattedDate;
  }
}


@Pipe({
    name: "formatTimer"
  })
  export class FormatTimerPipe implements PipeTransform {
    transform(value: number): string {
      const minutes: number = Math.floor(value / 60);
      return (
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    }
  }