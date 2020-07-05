import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationpopupComponent } from './notificationpopup.component';

describe('NotificationpopupComponent', () => {
  let component: NotificationpopupComponent;
  let fixture: ComponentFixture<NotificationpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
