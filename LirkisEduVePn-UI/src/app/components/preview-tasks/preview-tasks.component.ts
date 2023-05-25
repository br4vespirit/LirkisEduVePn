import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {TaskPreview} from "../../models/task-preview.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PreviewScenariosComponent} from "../preview-scenarios/preview-scenarios.component";
import {PreviewSceneComponent} from "../preview-scene/preview-scene.component";
import {Router} from "@angular/router";
import {UserProfile} from "../../models/user-profile.model";
import {TaskSessionFinishRequest} from "../../models/task-session-finish-request.model";

/**
 * Component that is used as a dialog to preview tasks and ability to start one of them
 */
@Component({
  selector: 'app-preview-tasks',
  templateUrl: './preview-tasks.component.html',
  styleUrls: ['./preview-tasks.component.css']
})
export class PreviewTasksComponent implements OnInit, OnDestroy {

  /**
   * List of tasks to preview
   */
  tasks: TaskPreview[] = [];

  /**
   * List of tasks on the current page
   */
  currentTasks: TaskPreview[] = [];

  /**
   * Selected languages for a current task
   */
  selectedLanguages: string[] = [];

  /**
   * Subscription to get all tasks available for a logged-in user
   */
  tasks_preview_subscription: Subscription = new Subscription();

  /**
   * Subscription to get a chosen task files
   */
  task_files_subscription: Subscription = new Subscription();

  /**
   * Subscription to finish a session of a running task
   */
  finish_session_subscription: Subscription = new Subscription();

  /**
   * Profile of a logged-in user
   */
  // @ts-ignore
  profile: UserProfile;

  /**
   * Total pages of tasks
   */
  max_pages: number = 0;

  /**
   * Current page
   */
  page: number = 0;

  /**
   * Items per page
   */
  items_per_page: number = 5;

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that uses for opening dialogs
   * @param _client BackendService instance that sends requests to a server
   * @param matDialog Angular Material component that uses for opening dialogs
   * @param _router Router field to route between components
   */
  constructor(private matDialogRef: MatDialogRef<PreviewTasksComponent>, private _client: BackendService,
              private matDialog: MatDialog, private _router: Router) {
  }

  /**
   * Method to get user profile from a local storage and load all tasks
   * that are available for the current user
   */
  ngOnInit() {
    // @ts-ignore
    this.profile = JSON.parse(localStorage.getItem("user-profile")) as UserProfile;
    this.tasks_preview_subscription = this._client.getTasksPreview(this.profile.id).subscribe(data => {
      this.tasks = data as TaskPreview[];
      this.selectedLanguages = this.tasks.map(t => t.scenario.languages[0])
      this.max_pages = Math.ceil(this.tasks.length / this.items_per_page);
      this.currentTasks = this.tasks.slice(0, Math.min(this.tasks.length, this.items_per_page));
    })
  }

  ngOnDestroy() {
    this.tasks_preview_subscription.unsubscribe();
    this.finish_session_subscription.unsubscribe();
  }

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }

  /**
   * Moves to the next page
   */
  prev_sessions() {
    this.page--;
    this.currentTasks = this.tasks.slice(this.page * this.items_per_page,
      Math.min(this.tasks.length, (this.page + 1) * this.items_per_page));
  }

  /**
   * Moves to the previous page
   */
  next_sessions() {
    this.page++;
    this.currentTasks = this.tasks.slice(this.page * this.items_per_page,
      Math.min(this.tasks.length, (this.page + 1) * this.items_per_page));
  }

  /**
   * Opens PreviewScenariosComponent of the chose task scenario
   * @param i task id
   */
  openScenarioPreview(i: number) {
    this.matDialog.open(PreviewScenariosComponent, {data: JSON.parse(JSON.stringify(this.tasks[i].scenario))});
  }

  /**
   * Opens PreviewSceneComponent of the chose task scene
   * @param i task id
   */
  openScenePreview(i: number) {
    this.matDialog.open(PreviewSceneComponent, {data: JSON.parse(JSON.stringify(this.tasks[i].scene))})
  }

  /**
   * Method to start task
   * @param i id of a task to start
   */
  startTask(i: number) {
    localStorage.removeItem("sessionID")
    this._router.navigate([`/${this.tasks[i].scene.folderName}/task/${this.tasks[i].id}/${this.selectedLanguages[i]}`]).then(() => {
      this.matDialogRef.close()
    });
  }

  /**
   * Method executes when the language of the chosen task changes
   * @param changedLanguage chosen language
   * @param index id of a task (in preview, not in database)
   */
  onLanguageChange(changedLanguage: string, index: number) {
    this.selectedLanguages[index] = changedLanguage;
  }

  /**
   * Method to continue already started task
   * @param i
   */
  continueTask(i: number) {
    localStorage.removeItem("sessionID");
    localStorage.setItem("sessionID", this.tasks[i].openSessions[0].toString());
    this._router.navigate([`/${this.tasks[i].scene.folderName}/task/${this.tasks[i].id}/${this.selectedLanguages[i]}`]).then(() => {
      this.matDialogRef.close()
    });
  }

  /**
   * Method to cancel already started task
   * @param i
   */
  cancelTask(i: number) {
    localStorage.removeItem("sessionID");
    let request: TaskSessionFinishRequest = new TaskSessionFinishRequest({
      taskSessionId: this.tasks[i].openSessions[0],
      successful: false,
      finishTime: new Date()
    })
    this.finish_session_subscription = this._client.finishTaskSession(request).subscribe(() => {
      console.log(request.taskSessionId)
      this.tasks_preview_subscription = this._client.getTasksPreview(this.profile.id).subscribe(data => {
        this.tasks = data as TaskPreview[];
        this.selectedLanguages = this.tasks.map(t => t.scenario.languages[0])
        this.max_pages = Math.ceil(this.tasks.length / this.items_per_page);
        this.currentTasks = this.tasks.slice(0, Math.min(this.tasks.length, this.items_per_page));
      })
    });
  }
}
