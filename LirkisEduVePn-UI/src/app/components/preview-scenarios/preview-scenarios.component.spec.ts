import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewScenariosComponent} from './preview-scenarios.component';

describe('PreviewScenariosComponent', () => {
  let component: PreviewScenariosComponent;
  let fixture: ComponentFixture<PreviewScenariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewScenariosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
