import { TestBed } from '@angular/core/testing';

import { Sha1Service } from './sha1.service';

describe('Sha1Service', () => {
  let service: Sha1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sha1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
