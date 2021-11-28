import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AggrePaymentTpinAuthRoutingModule } from './aggre-payment-tpin-auth-routing.module';
import { AggrePaymentTpinAuthComponent } from './aggre-payment-tpin-auth.component';


@NgModule({
  declarations: [AggrePaymentTpinAuthComponent],
  imports: [
    CommonModule,
    AggrePaymentTpinAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AggrePaymentTpinAuthModule { }
