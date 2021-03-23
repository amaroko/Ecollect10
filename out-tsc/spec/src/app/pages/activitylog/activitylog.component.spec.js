import { async, TestBed } from '@angular/core/testing';
import { ActivitylogComponent } from './activitylog.component';

describe('ActivitylogComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [ActivitylogComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(ActivitylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=activitylog.component.spec.js.map
