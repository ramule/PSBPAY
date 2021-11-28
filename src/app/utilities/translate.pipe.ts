import { Pipe, PipeTransform } from '@angular/core';
import { PreloginService } from '../../app/services/prelogin.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  
  constructor(private translate: PreloginService) {}

  transform(key: any): any {
    return this.translate.data[key] || key;
  }

}
