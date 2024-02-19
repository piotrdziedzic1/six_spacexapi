import { TestBed } from '@angular/core/testing';

import { LandpadsService } from './landpads.service';

describe('LandpadsService', () => {
  let service: LandpadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandpadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
