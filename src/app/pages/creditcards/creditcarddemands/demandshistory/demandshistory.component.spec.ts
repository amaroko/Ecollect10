import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandshistoryComponent } from './demandshistory.component';

describe('DemandshistoryComponent', () => {
  let component: DemandshistoryComponent;
  let fixture: ComponentFixture<DemandshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandshistoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
