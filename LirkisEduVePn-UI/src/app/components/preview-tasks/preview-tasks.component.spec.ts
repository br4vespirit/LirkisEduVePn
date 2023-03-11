import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewTasksComponent} from './preview-tasks.component';

describe('PreviewTasksComponent', () => {
  let component: PreviewTasksComponent;
  let fixture: ComponentFixture<PreviewTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewTasksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
