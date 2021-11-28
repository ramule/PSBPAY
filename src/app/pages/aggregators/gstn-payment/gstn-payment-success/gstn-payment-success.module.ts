import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GstnPaymentSuccessRoutingModule } from './gstn-payment-success-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GstnPaymentSuccessComponent } from './gstn-payment-success.component';

@NgModule({
  declarations: [GstnPaymentSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GstnPaymentSuccessRoutingModule
  ]
})
export class GstnPaymentSuccessModule { }
