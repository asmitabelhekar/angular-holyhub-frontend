import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveadvertiselistComponent } from './inactiveadvertiselist.component';

describe('InactiveadvertiselistComponent', () => {
  let component: InactiveadvertiselistComponent;
  let fixture: ComponentFixture<InactiveadvertiselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveadvertiselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveadvertiselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
