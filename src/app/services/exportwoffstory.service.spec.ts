import { TestBed } from '@angular/core/testing';

import { ExportwoffstoryService } from './exportwoffstory.service';

describe('ExportwoffstoryService', () => {
  let service: ExportwoffstoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportwoffstoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
