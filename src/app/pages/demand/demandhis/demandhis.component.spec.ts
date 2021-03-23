import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandhisComponent } from './demandhis.component';

describe('DemandhisComponent', () => {
  let component: DemandhisComponent;
  let fixture: ComponentFixture<DemandhisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandhisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandhisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
