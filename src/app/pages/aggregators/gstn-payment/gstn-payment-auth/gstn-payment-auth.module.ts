import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GstnPaymentAuthRoutingModule } from './gstn-payment-auth-routing.module';
import { GstnPaymentAuthComponent } from './gstn-payment-auth.component';

@NgModule({
  declarations: [GstnPaymentAuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GstnPaymentAuthRoutingModule
  ]
})
export class GstnPaymentAuthModule { }
