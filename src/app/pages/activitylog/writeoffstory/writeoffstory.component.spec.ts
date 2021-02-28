import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteoffstoryComponent } from './writeoffstory.component';

describe('WriteoffstoryComponent', () => {
  let component: WriteoffstoryComponent;
  let fixture: ComponentFixture<WriteoffstoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WriteoffstoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteoffstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
