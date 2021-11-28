import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AggrePaymentOverviewRoutingModule } from './aggre-payment-overview-routing.module';
import { AggrePaymentOverviewComponent } from './aggre-payment-overview.component';


@NgModule({
  declarations: [AggrePaymentOverviewComponent],
  imports: [
    CommonModule,
    AggrePaymentOverviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AggrePaymentOverviewModule { }
