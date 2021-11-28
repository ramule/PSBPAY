import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanTaxPaymentComponent } from './challan-tax-payment.component';

describe('ChallanTaxPaymentComponent', () => {
  let component: ChallanTaxPaymentComponent;
  let fixture: ComponentFixture<ChallanTaxPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanTaxPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanTaxPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
