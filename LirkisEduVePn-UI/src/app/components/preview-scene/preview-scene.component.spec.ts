import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewSceneComponent} from './preview-scene.component';

describe('PreviewSceneComponent', () => {
  let component: PreviewSceneComponent;
  let fixture: ComponentFixture<PreviewSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewSceneComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
