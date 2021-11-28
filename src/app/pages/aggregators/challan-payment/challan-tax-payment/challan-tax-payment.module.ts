import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallanTaxPaymentRoutingModule } from './challan-tax-payment-routing.module';
import { ChallanTaxPaymentComponent } from './challan-tax-payment.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';

@NgModule({
  declarations: [ChallanTaxPaymentComponent],
  imports: [
    CommonModule,
    ChallanTaxPaymentRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class ChallanTaxPaymentModule { }
