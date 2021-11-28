import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggrePaymentRoutingModule } from './aggre-payment-routing.module';
import { AggrePaymentComponent } from './aggre-payment.component';


@NgModule({
  declarations: [AggrePaymentComponent],
  imports: [
    CommonModule,
    AggrePaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AggrePaymentModule { }
