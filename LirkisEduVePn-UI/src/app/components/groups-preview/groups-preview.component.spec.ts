import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsPreviewComponent} from './groups-preview.component';

describe('GroupsPreviewComponent', () => {
  let component: GroupsPreviewComponent;
  let fixture: ComponentFixture<GroupsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsPreviewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
