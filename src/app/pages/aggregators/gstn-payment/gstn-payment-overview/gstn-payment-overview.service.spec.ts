import { TestBed } from '@angular/core/testing';

import { GstnPaymentOverviewService } from './gstn-payment-overview.service';

describe('GstnPaymentOverviewService', () => {
  let service: GstnPaymentOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstnPaymentOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
