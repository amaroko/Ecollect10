import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocreditComponent } from './nocredit.component';

describe('NocreditComponent', () => {
  let component: NocreditComponent;
  let fixture: ComponentFixture<NocreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NocreditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
