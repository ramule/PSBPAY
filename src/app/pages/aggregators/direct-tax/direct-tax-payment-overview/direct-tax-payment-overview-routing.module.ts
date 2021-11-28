import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectTaxPaymentOverviewComponent } from './direct-tax-payment-overview.component';

const routes: Routes = [
  {path : '' ,component : DirectTaxPaymentOverviewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectTaxPaymentOverviewRoutingModule { }
