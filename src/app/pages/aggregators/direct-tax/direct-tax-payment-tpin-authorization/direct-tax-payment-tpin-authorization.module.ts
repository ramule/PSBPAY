import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxPaymentTpinAuthorizationRoutingModule } from './direct-tax-payment-tpin-authorization-routing.module';
import { DirectTaxPaymentTpinAuthorizationComponent } from './direct-tax-payment-tpin-authorization.component';


@NgModule({
  declarations: [DirectTaxPaymentTpinAuthorizationComponent],
  imports: [
    CommonModule,
    DirectTaxPaymentTpinAuthorizationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DirectTaxPaymentTpinAuthorizationModule { }
