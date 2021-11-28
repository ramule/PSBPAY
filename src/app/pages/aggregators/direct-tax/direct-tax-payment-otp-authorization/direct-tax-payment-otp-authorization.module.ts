import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxPaymentOtpAuthorizationRoutingModule } from './direct-tax-payment-otp-authorization-routing.module';
import { DirectTaxPaymentOtpAuthorizationComponent } from './direct-tax-payment-otp-authorization.component';


@NgModule({
  declarations: [DirectTaxPaymentOtpAuthorizationComponent],
  imports: [
    CommonModule,
    DirectTaxPaymentOtpAuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DirectTaxPaymentOtpAuthorizationModule { }
