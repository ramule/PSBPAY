import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NumbersOnlyDirective, DigitOnlyDirective} from '../directives/numbers-only.directive';
import { TranslatePipe } from '../utilities/translate.pipe';
import { TwodigitdecimalnumberDirective } from '../directives/twodigitdecimalnumber.directive';
import { FirstLastChar } from '../pipes/first-last-char.pipe';
import { LimitDirectiveDirective } from '../directives/limit-directive.directive';
import { FormatDatePipe, FormatTimerPipe } from '../pipes/date-formatter.pipe';
import { DatePipe } from '@angular/common';
import {CustomCurrencyPipe,DynamicCurrencyPipe,FilterPipe } from '../pipes/custom-currency.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    NumbersOnlyDirective,
    DigitOnlyDirective,
    TwodigitdecimalnumberDirective,
    LimitDirectiveDirective,
    TranslatePipe,
    FirstLastChar,
    FormatTimerPipe,
    FormatDatePipe,
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    isolate: false
    }),
  ],
  exports: [
    TranslateModule,
    NumbersOnlyDirective,
    DigitOnlyDirective,
    TwodigitdecimalnumberDirective,
    LimitDirectiveDirective,
    TranslatePipe ,
    FirstLastChar,
    FormatTimerPipe,
    FormatDatePipe,
    CustomCurrencyPipe,
  ],
  providers :[FirstLastChar, DatePipe, CustomCurrencyPipe,FormatDatePipe]
})
export class SharedModule { }
