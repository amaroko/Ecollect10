import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccplanComponent } from './accplan.component';

describe('AccplanComponent', () => {
  let component: AccplanComponent;
  let fixture: ComponentFixture<AccplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccplanComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
