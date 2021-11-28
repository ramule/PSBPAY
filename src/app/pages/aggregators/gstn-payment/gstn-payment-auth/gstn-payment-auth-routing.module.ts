import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GstnPaymentAuthComponent } from './gstn-payment-auth.component';

const routes: Routes = [
  { path : '', component : GstnPaymentAuthComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstnPaymentAuthRoutingModule { }
