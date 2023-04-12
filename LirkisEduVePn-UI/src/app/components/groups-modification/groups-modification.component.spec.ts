import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsModificationComponent} from './groups-modification.component';

describe('GroupsModificationComponent', () => {
  let component: GroupsModificationComponent;
  let fixture: ComponentFixture<GroupsModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsModificationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupsModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
