import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Muzeum_habsbourgComponent} from './muzeum_habsbourg.component';

describe('SceneComponent', () => {
  let component: Muzeum_habsbourgComponent;
  let fixture: ComponentFixture<Muzeum_habsbourgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Muzeum_habsbourgComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Muzeum_habsbourgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
