import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskHistoryExtendedComponent} from './task-history-extended.component';

describe('TaskHistoryExtendedComponent', () => {
  let component: TaskHistoryExtendedComponent;
  let fixture: ComponentFixture<TaskHistoryExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskHistoryExtendedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskHistoryExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
