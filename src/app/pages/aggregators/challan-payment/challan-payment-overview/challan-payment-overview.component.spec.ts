import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanPaymentOverviewComponent } from './challan-payment-overview.component';

describe('ChallanPaymentOverviewComponent', () => {
  let component: ChallanPaymentOverviewComponent;
  let fixture: ComponentFixture<ChallanPaymentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanPaymentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanPaymentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
