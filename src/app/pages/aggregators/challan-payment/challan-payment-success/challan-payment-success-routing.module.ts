import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallanPaymentSuccessComponent } from './challan-payment-success.component';

const routes: Routes = [
  { path : '', component : ChallanPaymentSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanPaymentSuccessRoutingModule { }
