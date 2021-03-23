import { async, TestBed } from '@angular/core/testing';
import { NocreditComponent } from './nocredit.component';

describe('NocreditComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [NocreditComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(NocreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=nocredit.component.spec.js.map
