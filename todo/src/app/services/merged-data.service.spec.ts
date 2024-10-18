import { TestBed } from '@angular/core/testing';

import { MergedDataService } from './merged-data.service';

describe('MergedDataService', () => {
  let service: MergedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MergedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
