import { async, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';

describe('NotesComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [NotesComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=notes.component.spec.js.map
