import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandlettersComponent } from './demandletters.component';

describe('DemandlettersComponent', () => {
  let component: DemandlettersComponent;
  let fixture: ComponentFixture<DemandlettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandlettersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandlettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
