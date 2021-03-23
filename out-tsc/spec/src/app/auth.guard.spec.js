import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', function() {
  var guard;
  beforeEach(function() {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });
  it('should be created', function() {
    expect(guard).toBeTruthy();
  });
});
//# sourceMappingURL=auth.guard.spec.js.map
