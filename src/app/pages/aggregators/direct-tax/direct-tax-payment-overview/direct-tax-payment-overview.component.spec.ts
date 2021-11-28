import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTaxPaymentOverviewComponent } from './direct-tax-payment-overview.component';

describe('DirectTaxPaymentOverviewComponent', () => {
  let component: DirectTaxPaymentOverviewComponent;
  let fixture: ComponentFixture<DirectTaxPaymentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTaxPaymentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTaxPaymentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
