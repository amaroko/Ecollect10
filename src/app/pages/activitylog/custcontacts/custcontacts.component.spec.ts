import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustcontactsComponent } from './custcontacts.component';

describe('CustcontactsComponent', () => {
  let component: CustcontactsComponent;
  let fixture: ComponentFixture<CustcontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustcontactsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
