import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallanTaxPaymentComponent } from './challan-tax-payment.component';

const routes: Routes = [
  { path : '', component : ChallanTaxPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanTaxPaymentRoutingModule { }
