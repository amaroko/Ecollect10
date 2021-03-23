import { async, TestBed } from '@angular/core/testing';
import { NewremindersComponent } from './newreminders.component';

describe('NewremindersComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [NewremindersComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(NewremindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=newreminders.component.spec.js.map
