import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDoneComponent } from './meeting-done.component';

describe('MeetingDoneComponent', () => {
  let component: MeetingDoneComponent;
  let fixture: ComponentFixture<MeetingDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
