import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDashadminComponent } from './sidebar-dashadmin.component';

describe('SidebarDashadminComponent', () => {
  let component: SidebarDashadminComponent;
  let fixture: ComponentFixture<SidebarDashadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDashadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDashadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
