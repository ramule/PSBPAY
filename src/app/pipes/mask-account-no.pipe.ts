import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: "maskAccountNo" })
export class MaskAccountNoPipe implements PipeTransform {
  transform(accountNo : any ): string {
      if(accountNo){
        let maskedAccountNo = accountNo.replace(/\d(?=\d{4})/g, "X");
        return maskedAccountNo;
      }else{
          return accountNo;
      }
  }
}