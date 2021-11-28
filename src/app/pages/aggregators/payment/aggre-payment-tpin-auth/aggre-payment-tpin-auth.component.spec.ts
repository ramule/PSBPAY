import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrePaymentTpinAuthComponent } from './aggre-payment-tpin-auth.component';

describe('AggrePaymentTpinAuthComponent', () => {
  let component: AggrePaymentTpinAuthComponent;
  let fixture: ComponentFixture<AggrePaymentTpinAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggrePaymentTpinAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrePaymentTpinAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
