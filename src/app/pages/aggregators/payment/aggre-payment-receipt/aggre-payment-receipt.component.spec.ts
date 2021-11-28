import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrePaymentReceiptComponent } from './aggre-payment-receipt.component';

describe('AggrePaymentReceiptComponent', () => {
  let component: AggrePaymentReceiptComponent;
  let fixture: ComponentFixture<AggrePaymentReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggrePaymentReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrePaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
