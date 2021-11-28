import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxPaymentRoutingModule } from './direct-tax-payment-routing.module';
import { DirectTaxPaymentComponent } from './direct-tax-payment.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [DirectTaxPaymentComponent],
  imports: [
    CommonModule,
    DirectTaxPaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class DirectTaxPaymentModule { }
