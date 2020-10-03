import { TestBed } from '@angular/core/testing';

import { BikeDataServiceService } from './bike-data-service.service';

describe('BikeDataServiceService', () => {
  let service: BikeDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
