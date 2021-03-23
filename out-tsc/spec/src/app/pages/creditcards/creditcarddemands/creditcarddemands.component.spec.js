import { async, TestBed } from '@angular/core/testing';
import { CreditcarddemandsComponent } from './creditcarddemands.component';

describe('CreditcarddemandsComponent', function() {
  var component;
  var fixture;
  beforeEach(async(function() {
    TestBed.configureTestingModule({
      declarations: [CreditcarddemandsComponent]
    }).compileComponents();
  }));
  beforeEach(function() {
    fixture = TestBed.createComponent(CreditcarddemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', function() {
    expect(component).toBeTruthy();
  });
});
//# sourceMappingURL=creditcarddemands.component.spec.js.map
