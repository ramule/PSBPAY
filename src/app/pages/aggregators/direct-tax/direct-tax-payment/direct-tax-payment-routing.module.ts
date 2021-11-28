import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectTaxPaymentComponent } from './direct-tax-payment.component';

const routes: Routes = [
  {path : '' ,component : DirectTaxPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectTaxPaymentRoutingModule { }
