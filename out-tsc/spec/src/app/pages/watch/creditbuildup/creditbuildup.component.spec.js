import { async, TestBed } from '@angular/core/testing';
import { CreditbuildupComponent } from './creditbuildup.component';

describe('CreditbuildupComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [CreditbuildupComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(CreditbuildupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=creditbuildup.component.spec.js.map
