import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanPaymentSuccessComponent } from './challan-payment-success.component';

describe('ChallanPaymentSuccessComponent', () => {
  let component: ChallanPaymentSuccessComponent;
  let fixture: ComponentFixture<ChallanPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
