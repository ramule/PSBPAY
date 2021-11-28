import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AggrePaymentOtpAuthRoutingModule } from './aggre-payment-otp-auth-routing.module';
import { AggrePaymentOtpAuthComponent } from './aggre-payment-otp-auth.component';


@NgModule({
  declarations: [AggrePaymentOtpAuthComponent],
  imports: [
    CommonModule,
    AggrePaymentOtpAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AggrePaymentOtpAuthModule { }
