import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllremindersComponent } from './allreminders.component';

describe('AllremindersComponent', () => {
  let component: AllremindersComponent;
  let fixture: ComponentFixture<AllremindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllremindersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllremindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
