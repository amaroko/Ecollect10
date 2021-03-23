import { TestBed } from '@angular/core/testing';
import { ExcelService } from './excel.service';

describe('ExcelService', function() {
  var service;
  beforeEach(function() {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelService);
  });
  it('should be created', function() {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=excel.service.spec.js.map
