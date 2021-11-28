import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxPaymentOverviewRoutingModule } from './direct-tax-payment-overview-routing.module';
import { DirectTaxPaymentOverviewComponent } from './direct-tax-payment-overview.component';


@NgModule({
  declarations: [DirectTaxPaymentOverviewComponent],
  imports: [
    CommonModule,
    DirectTaxPaymentOverviewRoutingModule
  ]
})
export class DirectTaxPaymentOverviewModule { }
