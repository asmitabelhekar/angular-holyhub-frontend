import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentlogspopupComponent } from './paymentlogspopup.component';

describe('PaymentlogspopupComponent', () => {
  let component: PaymentlogspopupComponent;
  let fixture: ComponentFixture<PaymentlogspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentlogspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentlogspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
