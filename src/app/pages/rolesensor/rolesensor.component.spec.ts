import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesensorComponent } from './rolesensor.component';

describe('RolesensorComponent', () => {
  let component: RolesensorComponent;
  let fixture: ComponentFixture<RolesensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesensorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
