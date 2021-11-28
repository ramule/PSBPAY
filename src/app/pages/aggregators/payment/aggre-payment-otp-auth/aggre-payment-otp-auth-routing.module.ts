import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggrePaymentOtpAuthComponent } from './aggre-payment-otp-auth.component';

const routes: Routes = [
  {path : '', component : AggrePaymentOtpAuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggrePaymentOtpAuthRoutingModule { }
