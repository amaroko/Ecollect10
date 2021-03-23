import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanactionsComponent } from './planactions.component';

describe('PlanactionsComponent', () => {
  let component: PlanactionsComponent;
  let fixture: ComponentFixture<PlanactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanactionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
