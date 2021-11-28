import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnPaymentAuthComponent } from './gstn-payment-auth.component';

describe('GstnPaymentAuthComponent', () => {
  let component: GstnPaymentAuthComponent;
  let fixture: ComponentFixture<GstnPaymentAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstnPaymentAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnPaymentAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
