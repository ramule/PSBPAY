import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectTaxPaymentOtpAuthorizationComponent } from './direct-tax-payment-otp-authorization.component';

const routes: Routes = [
  {path : '' ,component : DirectTaxPaymentOtpAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectTaxPaymentOtpAuthorizationRoutingModule { }
