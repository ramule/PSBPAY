import { TestBed } from '@angular/core/testing';

import { ChallanPaymentAuthorizationService } from './challan-payment-authorization.service';

describe('ChallanPaymentAuthorizationService', () => {
  let service: ChallanPaymentAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanPaymentAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
