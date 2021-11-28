import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanPaymentAuthorizationComponent } from './challan-payment-authorization.component';

describe('ChallanPaymentAuthorizationComponent', () => {
  let component: ChallanPaymentAuthorizationComponent;
  let fixture: ComponentFixture<ChallanPaymentAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallanPaymentAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanPaymentAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
