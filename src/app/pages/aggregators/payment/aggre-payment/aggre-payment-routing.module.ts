import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggrePaymentComponent } from './aggre-payment.component';

const routes: Routes = [
  {path : '', component : AggrePaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggrePaymentRoutingModule { }
