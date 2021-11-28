import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrePaymentOverviewComponent } from './aggre-payment-overview.component';

describe('AggrePaymentOverviewComponent', () => {
  let component: AggrePaymentOverviewComponent;
  let fixture: ComponentFixture<AggrePaymentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggrePaymentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggrePaymentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
