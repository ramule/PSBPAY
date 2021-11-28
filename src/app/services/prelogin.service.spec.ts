import { TestBed } from '@angular/core/testing';

import { PreloginService } from './prelogin.service';

describe('PreloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreloginService = TestBed.get(PreloginService);
    expect(service).toBeTruthy();
  });
});
