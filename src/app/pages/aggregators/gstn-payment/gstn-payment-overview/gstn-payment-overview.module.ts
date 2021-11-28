import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GstnPaymentOverviewRoutingModule } from './gstn-payment-overview-routing.module';
import { GstnPaymentOverviewComponent } from './gstn-payment-overview.component';

@NgModule({
  declarations: [GstnPaymentOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GstnPaymentOverviewRoutingModule
  ]
})
export class GstnPaymentOverviewModule { }
