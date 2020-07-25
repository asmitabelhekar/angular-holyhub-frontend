import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivebannerlistComponent } from './inactivebannerlist.component';

describe('InactivebannerlistComponent', () => {
  let component: InactivebannerlistComponent;
  let fixture: ComponentFixture<InactivebannerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactivebannerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactivebannerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
