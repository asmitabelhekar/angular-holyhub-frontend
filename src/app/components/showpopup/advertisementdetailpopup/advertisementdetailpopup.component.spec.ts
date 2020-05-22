import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementdetailpopupComponent } from './advertisementdetailpopup.component';

describe('AdvertisementdetailpopupComponent', () => {
  let component: AdvertisementdetailpopupComponent;
  let fixture: ComponentFixture<AdvertisementdetailpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementdetailpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementdetailpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
