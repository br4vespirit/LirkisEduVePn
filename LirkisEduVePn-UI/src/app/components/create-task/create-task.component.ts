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

/**
 * Component that is used as a form for creating tasks in a system
 */
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  /**
   * List of scenes from which tasks can be created
   */
  scenes: ScenePreview[] = [];

  /**
   * List of scenarios from which tasks can be created
   */
  scenarios: ScenarioPreview[] = [];

  /**
   * Stage of task creation. There are 3 stages: define task info, choose scenario and choose scene
   */
  stage: number = 1;

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  /**
   * Subscription for getting list of available scenes
   */
  scene_subscription: Subscription = new Subscription();

  /**
   * Subscription for getting list of available scenarios
   */
  scenario_subscription: Subscription = new Subscription();

  /**
   * Subscription for creating a task
   */
  task_creation_subscription: Subscription = new Subscription();

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that defines that this component is dialog
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   * @param matDialog Angular Material component that uses for opening dialogs
   */
  constructor(private matDialogRef: MatDialogRef<CreateTaskComponent>, private _client: BackendService,
              private _snackBar: MatSnackBar, private matDialog: MatDialog) {
  }

  /**
   * Gets a name field from a form group
   */
  get name() {
    return this.form.controls['name'];
  }

  /**
   * Gets a description field from a form group
   */
  get description() {
    return this.form.controls['description'];
  }

  /**
   * Gets a scenario field from a form group
   */
  get scenario() {
    return this.form.controls['scenario'];
  }

  /**
   * Gets a scene field from a form group
   */
  get scene() {
    return this.form.controls['scene'];
  }

  /**
   * Reads all scenarios and scenes from a database, inits a form group for creating a task
   */
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

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }

  /**
   * Submits the form with the task to create
   */
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

  /**
   * Opens unsuccessful snack bar with a provided message
   * @param message message to show
   */
  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  /**
   * Opens successful snack bar
   */
  openSuccessfulSnackbar() {
    this._snackBar.open("Task was successfully created", '', {
      duration: 5000,
    });
    this.form.reset();
  }

  /**
   * Moves to the 1 stage
   */
  goToStage1() {
    this.stage = 1;
  }

  /**
   * Moves to the 2 stage
   */
  goToStage2() {
    this.stage = 2;
  }

  /**
   * Moves to the 3 stage
   */
  goToStage3() {
    this.stage = 3;
  }

  /**
   * Opens preview for a scenario in additional dialog
   * @param i id of a scenario to preview
   */
  openScenarioPreview(i: number) {
    this.matDialog.open(PreviewScenariosComponent, {data: JSON.parse(JSON.stringify(this.scenarios[i]))});
  }

  /**
   * Opens preview for a scene in additional dialog
   * @param i id of a scene to preview
   */
  openScenePreview(i: number) {
    this.matDialog.open(PreviewSceneComponent, {data: JSON.parse(JSON.stringify(this.scenes[i]))})
  }
}
