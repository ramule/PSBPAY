import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnPaymentComponent } from './gstn-payment.component';

describe('GstnPaymentComponent', () => {
  let component: GstnPaymentComponent;
  let fixture: ComponentFixture<GstnPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstnPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
