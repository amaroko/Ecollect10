import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsdueComponent } from './demandsdue.component';

describe('DemandsdueComponent', () => {
  let component: DemandsdueComponent;
  let fixture: ComponentFixture<DemandsdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandsdueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
