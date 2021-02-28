import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcardsComponent } from './allcards.component';

describe('AllcardsComponent', () => {
  let component: AllcardsComponent;
  let fixture: ComponentFixture<AllcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllcardsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
