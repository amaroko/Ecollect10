import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PermissionsensorComponent} from './permissionsensor.component';

describe('PermissionsensorComponent', () => {
  let component: PermissionsensorComponent;
  let fixture: ComponentFixture<PermissionsensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionsensorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
