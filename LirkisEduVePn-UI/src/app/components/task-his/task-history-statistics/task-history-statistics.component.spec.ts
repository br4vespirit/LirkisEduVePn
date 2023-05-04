import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskHistoryStatisticsComponent} from './task-history-statistics.component';

describe('TaskHistoryStatisticsComponent', () => {
  let component: TaskHistoryStatisticsComponent;
  let fixture: ComponentFixture<TaskHistoryStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskHistoryStatisticsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskHistoryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
