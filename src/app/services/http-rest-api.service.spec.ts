import { TestBed } from '@angular/core/testing';

import { HttpRestApiService } from './http-rest-api.service';

describe('HttpRestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRestApiService = TestBed.get(HttpRestApiService);
    expect(service).toBeTruthy();
  });
});
