import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagepopupComponent } from './languagepopup.component';

describe('LanguagepopupComponent', () => {
  let component: LanguagepopupComponent;
  let fixture: ComponentFixture<LanguagepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
