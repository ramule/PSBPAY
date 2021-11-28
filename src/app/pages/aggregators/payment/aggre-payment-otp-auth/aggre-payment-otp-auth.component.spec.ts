import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrePaymentOtpAuthComponent } from './aggre-payment-otp-auth.component';

describe('AggrePaymentOtpAuthComponent', () => {
  let component: AggrePaymentOtpAuthComponent;
  let fixture: ComponentFixture<AggrePaymentOtpAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggrePaymentOtpAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrePaymentOtpAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
