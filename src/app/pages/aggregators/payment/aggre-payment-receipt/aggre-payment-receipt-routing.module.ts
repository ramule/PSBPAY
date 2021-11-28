import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggrePaymentReceiptComponent } from './aggre-payment-receipt.component';

const routes: Routes = [
  {path : '', component : AggrePaymentReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggrePaymentReceiptRoutingModule { }
