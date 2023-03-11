import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScenePreview} from "../../models/scene-preview.model";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {ScenarioPreview} from "../../models/scenario-preview.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PreviewScenariosComponent} from "../preview-scenarios/preview-scenarios.component";
import {PreviewSceneComponent} from "../preview-scene/preview-scene.component";
import {TaskCreation} from "../../models/task-creation.model";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  scenes: ScenePreview[] = [];
  scenarios: ScenarioPreview[] = [];

  stage: number = 1;

  // @ts-ignore
  form: FormGroup;

  scene_subscription: Subscription = new Subscription();
  scenario_subscription: Subscription = new Subscription();
  task_creation_subscription: Subscription = new Subscription();

  constructor(private matDialogRef: MatDialogRef<CreateTaskComponent>, private _client: BackendService,
              private _snackBar: MatSnackBar, private matDialog: MatDialog) {
  }

  get name() {
    return this.form.controls['name'];
  }

  get description() {
    return this.form.controls['description'];
  }

  get scenario() {
    return this.form.controls['scenario'];
  }

  get scene() {
    return this.form.controls['scene'];
  }

  ngOnInit() {
    this.scene_subscription = this._client.getScenesPreview().subscribe(data => {
      this.scenes = data as ScenePreview[];
    })
    this.scenario_subscription = this._client.getScenariosPreview().subscribe(data => {
      this.scenarios = data as ScenarioPreview[];
    })

    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      scenario: new FormControl('', [Validators.required]),
      scene: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy() {
    this.scenario_subscription.unsubscribe();
    this.scene_subscription.unsubscribe();
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  send() {
    let task: TaskCreation = new TaskCreation({
      name: this.name.value,
      description: this.description.value,
      scenarioId: Number(this.scenario.value),
      sceneId: Number(this.scene.value)
    });
    this.task_creation_subscription = this._client.saveTask(task).subscribe({
      next: () => {
        this.openSuccessfulSnackbar();
      },
      error: (response) => {
        if (response.status === 400) {
          this.openUnsuccessfulSnackbar(response.error);
        } else {
          this.openUnsuccessfulSnackbar("An unexpected error occurred");
        }
      }
    });
  }

  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  openSuccessfulSnackbar() {
    this._snackBar.open("Task was successfully created", '', {
      duration: 5000,
    });
    this.form.reset();
  }

  goToStage1() {
    this.stage = 1;
  }

  goToStage2() {
    this.stage = 2;
  }

  goToStage3() {
    this.stage = 3;
  }

  openScenarioPreview(i: number) {
    this.matDialog.open(PreviewScenariosComponent, {data: JSON.parse(JSON.stringify(this.scenarios[i]))});
  }

  openScenePreview(i: number) {
    this.matDialog.open(PreviewSceneComponent, {data: JSON.parse(JSON.stringify(this.scenes[i]))})
  }
}
