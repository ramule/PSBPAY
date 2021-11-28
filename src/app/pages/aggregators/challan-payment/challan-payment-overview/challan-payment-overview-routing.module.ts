import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallanPaymentOverviewComponent } from './challan-payment-overview.component';

const routes: Routes = [
  { path : '', component : ChallanPaymentOverviewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanPaymentOverviewRoutingModule { }
