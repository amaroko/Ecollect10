import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccplansComponent } from './accplans.component';

describe('AccplansComponent', () => {
  let component: AccplansComponent;
  let fixture: ComponentFixture<AccplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccplansComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
