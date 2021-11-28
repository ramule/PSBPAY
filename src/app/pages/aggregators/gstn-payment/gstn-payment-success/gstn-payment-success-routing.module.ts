import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GstnPaymentSuccessComponent } from './gstn-payment-success.component';

const routes: Routes = [
  { path : '', component : GstnPaymentSuccessComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstnPaymentSuccessRoutingModule { }
