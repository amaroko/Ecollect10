import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcarddemandsComponent } from './creditcarddemands.component';

describe('CreditcarddemandsComponent', () => {
  let component: CreditcarddemandsComponent;
  let fixture: ComponentFixture<CreditcarddemandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditcarddemandsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditcarddemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
