import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AggrePaymentReceiptRoutingModule } from './aggre-payment-receipt-routing.module';
import { AggrePaymentReceiptComponent } from './aggre-payment-receipt.component';


@NgModule({
  declarations: [AggrePaymentReceiptComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AggrePaymentReceiptRoutingModule,
  ]
})
export class AggrePaymentReceiptModule { }
