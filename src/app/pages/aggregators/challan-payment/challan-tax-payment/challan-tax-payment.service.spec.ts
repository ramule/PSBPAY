import { TestBed } from '@angular/core/testing';

import { ChallanTaxPaymentService } from './challan-tax-payment.service';

describe('ChallanTaxPaymentService', () => {
  let service: ChallanTaxPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanTaxPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
