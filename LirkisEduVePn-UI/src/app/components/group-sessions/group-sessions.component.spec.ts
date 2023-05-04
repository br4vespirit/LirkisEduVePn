import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupSessionsComponent} from './group-sessions.component';

describe('GroupSessionsComponent', () => {
  let component: GroupSessionsComponent;
  let fixture: ComponentFixture<GroupSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupSessionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
