import { TestBed } from '@angular/core/testing';
import { EcolService } from './ecol.service';

describe('EcolService', function() {
  var service;
  beforeEach(function() {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcolService);
  });
  it('should be created', function() {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=ecol.service.spec.js.map
