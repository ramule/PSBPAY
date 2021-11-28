import { TestBed } from '@angular/core/testing';

import { GstnPaymentService } from './gstn-payment.service';

describe('GstnPaymentService', () => {
  let service: GstnPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstnPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
