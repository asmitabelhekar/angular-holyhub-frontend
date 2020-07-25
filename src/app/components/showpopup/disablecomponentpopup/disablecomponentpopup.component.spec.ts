import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisablecomponentpopupComponent } from './disablecomponentpopup.component';

describe('DisablecomponentpopupComponent', () => {
  let component: DisablecomponentpopupComponent;
  let fixture: ComponentFixture<DisablecomponentpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisablecomponentpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisablecomponentpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
