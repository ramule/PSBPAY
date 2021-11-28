import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallanPaymentAuthorizationRoutingModule } from './challan-payment-authorization-routing.module';
import { ChallanPaymentAuthorizationComponent } from './challan-payment-authorization.component';


@NgModule({
  declarations: [ChallanPaymentAuthorizationComponent],
  imports: [
    CommonModule,
    ChallanPaymentAuthorizationRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ChallanPaymentAuthorizationModule { }
