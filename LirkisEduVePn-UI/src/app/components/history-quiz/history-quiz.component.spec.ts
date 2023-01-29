import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryQuizComponent } from './history-quiz.component';

describe('HistoryQuizComponent', () => {
  let component: HistoryQuizComponent;
  let fixture: ComponentFixture<HistoryQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
