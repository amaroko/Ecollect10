import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanmemosComponent } from './planmemos.component';

describe('PlanmemosComponent', () => {
  let component: PlanmemosComponent;
  let fixture: ComponentFixture<PlanmemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanmemosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanmemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
