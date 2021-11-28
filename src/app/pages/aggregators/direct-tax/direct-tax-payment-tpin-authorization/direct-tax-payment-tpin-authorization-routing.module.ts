import { DirectTaxPaymentTpinAuthorizationComponent } from './direct-tax-payment-tpin-authorization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '' , component : DirectTaxPaymentTpinAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectTaxPaymentTpinAuthorizationRoutingModule { }
