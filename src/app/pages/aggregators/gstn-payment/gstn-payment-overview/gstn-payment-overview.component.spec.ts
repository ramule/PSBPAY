import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnPaymentOverviewComponent } from './gstn-payment-overview.component';

describe('GstnPaymentOverviewComponent', () => {
  let component: GstnPaymentOverviewComponent;
  let fixture: ComponentFixture<GstnPaymentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstnPaymentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnPaymentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
