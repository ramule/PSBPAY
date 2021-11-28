import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTaxPaymentOtpAuthorizationComponent } from './direct-tax-payment-otp-authorization.component';

describe('DirectTaxPaymentOtpAuthorizationComponent', () => {
  let component: DirectTaxPaymentOtpAuthorizationComponent;
  let fixture: ComponentFixture<DirectTaxPaymentOtpAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTaxPaymentOtpAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTaxPaymentOtpAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
