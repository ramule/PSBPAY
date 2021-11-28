import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnPaymentSuccessComponent } from './gstn-payment-success.component';

describe('GstnPaymentSuccessComponent', () => {
  let component: GstnPaymentSuccessComponent;
  let fixture: ComponentFixture<GstnPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstnPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
