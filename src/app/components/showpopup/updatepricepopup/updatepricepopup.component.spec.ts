import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepricepopupComponent } from './updatepricepopup.component';

describe('UpdatepricepopupComponent', () => {
  let component: UpdatepricepopupComponent;
  let fixture: ComponentFixture<UpdatepricepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepricepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepricepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
