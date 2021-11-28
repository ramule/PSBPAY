import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTaxPaymentTpinAuthorizationComponent } from './direct-tax-payment-tpin-authorization.component';

describe('DirectTaxPaymentTpinAuthorizationComponent', () => {
  let component: DirectTaxPaymentTpinAuthorizationComponent;
  let fixture: ComponentFixture<DirectTaxPaymentTpinAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTaxPaymentTpinAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTaxPaymentTpinAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
