import { TestBed } from '@angular/core/testing';

import { GstnPaymentSuccessService } from './gstn-payment-success.service';

describe('GstnPaymentSuccessService', () => {
  let service: GstnPaymentSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstnPaymentSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
