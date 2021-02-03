import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditbuildupComponent} from './creditbuildup.component';

describe('CreditbuildupComponent', () => {
  let component: CreditbuildupComponent;
  let fixture: ComponentFixture<CreditbuildupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditbuildupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditbuildupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
