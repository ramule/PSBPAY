import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxReceiptRoutingModule } from './direct-tax-receipt-routing.module';
import { DirectTaxReceiptComponent } from './direct-tax-receipt.component';


@NgModule({
  declarations: [DirectTaxReceiptComponent],
  imports: [
    CommonModule,
    DirectTaxReceiptRoutingModule
  ]
})
export class DirectTaxReceiptModule { }
