import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerupdateComponent } from './bannerupdate.component';

describe('BannerupdateComponent', () => {
  let component: BannerupdateComponent;
  let fixture: ComponentFixture<BannerupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
