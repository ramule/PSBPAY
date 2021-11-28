import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggrePaymentTpinAuthComponent } from './aggre-payment-tpin-auth.component';

const routes: Routes = [
  {path : '', component : AggrePaymentTpinAuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggrePaymentTpinAuthRoutingModule { }
