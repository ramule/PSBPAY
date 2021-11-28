import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggrePaymentOverviewComponent } from './aggre-payment-overview.component';

const routes: Routes = [
  {path : '', component : AggrePaymentOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggrePaymentOverviewRoutingModule { }
