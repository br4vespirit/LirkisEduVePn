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

@Component({
  selector: 'app-preview-tasks',
  templateUrl: './preview-tasks.component.html',
  styleUrls: ['./preview-tasks.component.css']
})
export class PreviewTasksComponent implements OnInit, OnDestroy {

  tasks: TaskPreview[] = [];

  currentTasks: TaskPreview[] = [];

  selectedLanguages: string[] = [];

  tasks_preview_subscription: Subscription = new Subscription();
  task_files_subscription: Subscription = new Subscription();
  finish_session_subscription: Subscription = new Subscription();

  // @ts-ignore
  profile: UserProfile;

  max_pages: number = 0;
  page: number = 0;
  items_per_page: number = 5;

  constructor(private matDialogRef: MatDialogRef<PreviewTasksComponent>, private _client: BackendService,
              private matDialog: MatDialog, private _router: Router) {
  }

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

  closeDialog() {
    this.matDialogRef.close();
  }

  prev_sessions() {
    this.page--;
    this.currentTasks = this.tasks.slice(this.page * this.items_per_page,
      Math.min(this.tasks.length, (this.page + 1) * this.items_per_page));
  }

  next_sessions() {
    this.page++;
    this.currentTasks = this.tasks.slice(this.page * this.items_per_page,
      Math.min(this.tasks.length, (this.page + 1) * this.items_per_page));
  }

  openScenarioPreview(i: number) {
    this.matDialog.open(PreviewScenariosComponent, {data: JSON.parse(JSON.stringify(this.tasks[i].scenario))});
  }

  openScenePreview(i: number) {
    this.matDialog.open(PreviewSceneComponent, {data: JSON.parse(JSON.stringify(this.tasks[i].scene))})
  }

  startTask(i: number) {
    localStorage.removeItem("sessionID")
    this._router.navigate([`/${this.tasks[i].scene.folderName}/task/${this.tasks[i].id}/${this.selectedLanguages[i]}`]).then(() => {
      this.matDialogRef.close()
    });
  }

  onLanguageChange(changedLanguage: string, index: number) {
    this.selectedLanguages[index] = changedLanguage;
  }

  continueTask(i: number) {
    localStorage.removeItem("sessionID");
    localStorage.setItem("sessionID", this.tasks[i].openSessions[0].toString());
    this._router.navigate([`/${this.tasks[i].scene.folderName}/task/${this.tasks[i].id}/${this.selectedLanguages[i]}`]).then(() => {
      this.matDialogRef.close()
    });
  }

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
