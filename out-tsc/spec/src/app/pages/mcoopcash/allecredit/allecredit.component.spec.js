import { async, TestBed } from '@angular/core/testing';
import { AllecreditComponent } from './allecredit.component';

describe('AllcreditComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [AllecreditComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(AllecreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=allecredit.component.spec.js.map
