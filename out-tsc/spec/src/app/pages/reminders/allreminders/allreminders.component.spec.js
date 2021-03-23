import { async, TestBed } from '@angular/core/testing';
import { AllremindersComponent } from './allreminders.component';

describe('AllremindersComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [AllremindersComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(AllremindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=allreminders.component.spec.js.map
