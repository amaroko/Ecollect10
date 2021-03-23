import { async, TestBed } from '@angular/core/testing';
import { ActivityhomeComponent } from './activityhome.component';

describe('ActivityhomeComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [ActivityhomeComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(ActivityhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=activityhome.component.spec.js.map
