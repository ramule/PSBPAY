import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallanPaymentOverviewRoutingModule } from './challan-payment-overview-routing.module';
import { ChallanPaymentOverviewComponent } from './challan-payment-overview.component';


@NgModule({
  declarations: [ChallanPaymentOverviewComponent],
  imports: [
    CommonModule,
    ChallanPaymentOverviewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChallanPaymentOverviewModule { }
