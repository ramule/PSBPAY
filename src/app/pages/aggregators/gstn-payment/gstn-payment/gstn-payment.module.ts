import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GstnPaymentRoutingModule } from './gstn-payment-routing.module';
import { GstnPaymentComponent } from './gstn-payment.component';

@NgModule({
  declarations: [GstnPaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GstnPaymentRoutingModule
  ]
})
export class GstnPaymentModule { }
