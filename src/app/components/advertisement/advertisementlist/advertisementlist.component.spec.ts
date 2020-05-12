import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementlistComponent } from './advertisementlist.component';

describe('AdvertisementlistComponent', () => {
  let component: AdvertisementlistComponent;
  let fixture: ComponentFixture<AdvertisementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
