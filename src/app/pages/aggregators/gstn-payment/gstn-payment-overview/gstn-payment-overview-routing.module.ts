import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GstnPaymentOverviewComponent } from './gstn-payment-overview.component';

const routes: Routes = [
  { path : '', component : GstnPaymentOverviewComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstnPaymentOverviewRoutingModule { }
