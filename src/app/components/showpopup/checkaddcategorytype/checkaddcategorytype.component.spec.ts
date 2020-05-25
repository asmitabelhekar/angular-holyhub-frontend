import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckaddcategorytypeComponent } from './checkaddcategorytype.component';

describe('CheckaddcategorytypeComponent', () => {
  let component: CheckaddcategorytypeComponent;
  let fixture: ComponentFixture<CheckaddcategorytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckaddcategorytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckaddcategorytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
