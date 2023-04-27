import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {TaskPreview} from "../../models/task-preview.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PreviewScenariosComponent} from "../preview-scenarios/preview-scenarios.component";
import {PreviewSceneComponent} from "../preview-scene/preview-scene.component";
import {Router} from "@angular/router";
import {UserProfile} from "../../models/user-profile.model";

@Component({
  selector: 'app-preview-tasks',
  templateUrl: './preview-tasks.component.html',
  styleUrls: ['./preview-tasks.component.css']
})
export class PreviewTasksComponent implements OnInit, OnDestroy {

  tasks: TaskPreview[] = [];

  selectedLanguages: string[] = [];

  tasks_preview_subscription: Subscription = new Subscription();
  task_files_subscription: Subscription = new Subscription();

  // @ts-ignore
  profile: UserProfile;

  constructor(private matDialogRef: MatDialogRef<PreviewTasksComponent>, private _client: BackendService,
              private matDialog: MatDialog, private _router: Router) {
  }

  ngOnInit() {

    // @ts-ignore
    this.profile = JSON.parse(localStorage.getItem("user-profile")) as UserProfile;
    this.tasks_preview_subscription = this._client.getTasksPreview(this.profile.id).subscribe(data => {
      this.tasks = data as TaskPreview[];
      this.selectedLanguages = this.tasks.map(t => t.scenario.languages[0])
      console.log(this.tasks);
    })
  }

  ngOnDestroy() {
    this.tasks_preview_subscription.unsubscribe();
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  openScenarioPreview(i: number) {
    this.matDialog.open(PreviewScenariosComponent, {data: JSON.parse(JSON.stringify(this.tasks[i].scenario))});
  }

  openScenePreview(i: number) {
    this.matDialog.open(PreviewSceneComponent, {data: JSON.parse(JSON.stringify(this.tasks[i].scene))})
  }

  startTask(i: number) {
    this._router.navigate([`/${this.tasks[i].scene.folderName}/task/${this.tasks[i].id}/${this.selectedLanguages[i]}`]).then(() => {
      this.matDialogRef.close()
    });
  }

  onLanguageChange(changedLanguage: string, index: number) {
    this.selectedLanguages[index] = changedLanguage;
  }
}
