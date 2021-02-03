import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewremindersComponent} from './newreminders.component';

describe('NewremindersComponent', () => {
  let component: NewremindersComponent;
  let fixture: ComponentFixture<NewremindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewremindersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewremindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
