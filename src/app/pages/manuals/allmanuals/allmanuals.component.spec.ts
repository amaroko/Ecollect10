import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmanualsComponent } from './allmanuals.component';

describe('AllmanualsComponent', () => {
  let component: AllmanualsComponent;
  let fixture: ComponentFixture<AllmanualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllmanualsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmanualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
