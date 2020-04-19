import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDashboardAdminComponent } from './update-dashboard-admin.component';

describe('UpdateDashboardAdminComponent', () => {
  let component: UpdateDashboardAdminComponent;
  let fixture: ComponentFixture<UpdateDashboardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDashboardAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
