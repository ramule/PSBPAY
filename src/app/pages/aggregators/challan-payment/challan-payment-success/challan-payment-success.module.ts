import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallanPaymentSuccessRoutingModule } from './challan-payment-success-routing.module';
import { ChallanPaymentSuccessComponent } from './challan-payment-success.component';


@NgModule({
  declarations: [ChallanPaymentSuccessComponent],
  imports: [
    CommonModule,
    ChallanPaymentSuccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ChallanPaymentSuccessModule { }
