import { __awaiter, __generator } from 'tslib';
import { TestBed } from '@angular/core/testing';
import { DemandshistoryComponent } from './demandshistory.component';

describe('DemandshistoryComponent', function() {
  var component;
  var fixture;
  beforeEach(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, TestBed.configureTestingModule({
              declarations: [DemandshistoryComponent]
            }).compileComponents()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
  beforeEach(function() {
    fixture = TestBed.createComponent(DemandshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=demandshistory.component.spec.js.map
