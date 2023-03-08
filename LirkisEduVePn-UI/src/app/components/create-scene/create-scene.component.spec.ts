import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateSceneComponent} from './create-scene.component';

describe('CreateSceneComponent', () => {
  let component: CreateSceneComponent;
  let fixture: ComponentFixture<CreateSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSceneComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
