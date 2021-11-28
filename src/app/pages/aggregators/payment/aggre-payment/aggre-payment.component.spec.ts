import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrePaymentComponent } from './aggre-payment.component';

describe('AggrePaymentComponent', () => {
  let component: AggrePaymentComponent;
  let fixture: ComponentFixture<AggrePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggrePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
