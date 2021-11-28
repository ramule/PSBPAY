import { TestBed } from '@angular/core/testing';

import { GstnPaymentAuthService } from './gstn-payment-auth.service';

describe('GstnPaymentAuthService', () => {
  let service: GstnPaymentAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstnPaymentAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
