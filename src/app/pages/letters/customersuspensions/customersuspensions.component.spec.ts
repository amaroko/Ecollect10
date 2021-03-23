import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersuspensionsComponent } from './customersuspensions.component';

describe('CustomersuspensionsComponent', () => {
  let component: CustomersuspensionsComponent;
  let fixture: ComponentFixture<CustomersuspensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersuspensionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersuspensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
