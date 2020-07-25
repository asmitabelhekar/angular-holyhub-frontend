import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsdetailsComponent } from './subscriptionsdetails.component';

describe('SubscriptionsdetailsComponent', () => {
  let component: SubscriptionsdetailsComponent;
  let fixture: ComponentFixture<SubscriptionsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
