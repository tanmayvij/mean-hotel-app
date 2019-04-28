import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOneComponent } from './hotel-one.component';

describe('HotelOneComponent', () => {
  let component: HotelOneComponent;
  let fixture: ComponentFixture<HotelOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
