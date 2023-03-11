import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {TaskPreview} from "../../models/task-preview.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PreviewScenariosComponent} from "../preview-scenarios/preview-scenarios.component";
import {PreviewSceneComponent} from "../preview-scene/preview-scene.component";
import {TaskFiles} from "../../models/task-files.model";

@Component({
  selector: 'app-preview-tasks',
  templateUrl: './preview-tasks.component.html',
  styleUrls: ['./preview-tasks.component.css']
})
export class PreviewTasksComponent implements OnInit, OnDestroy {

  tasks: TaskPreview[] = [];

  tasks_preview_subscription: Subscription = new Subscription();
  task_files_subscription: Subscription = new Subscription();

  constructor(private matDialogRef: MatDialogRef<PreviewTasksComponent>, private _client: BackendService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.tasks_preview_subscription = this._client.getTasksPreview().subscribe(data => {
      this.tasks = data as TaskPreview[];
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
    let taskFiles: TaskFiles;
    this.task_files_subscription = this._client.getTaskFiles(this.tasks[i].id).subscribe(data => {
      taskFiles = data as TaskFiles;
      TaskFiles.decode(taskFiles);

      const htmlFilePath = 'LirkisEduVePn-UI/src/app/components/scene/scene.component.html';
      const tsFilePath = 'LirkisEduVePn-UI/src/app/components/scene/scene.component.ts';
      const specTsFilePath = 'LirkisEduVePn-UI/src/app/components/scene/scene.component.spec.ts';
      const pnmlFilePath = 'LirkisEduVePn-UI/src/assets/petriNetFile/scenario.pnml';
      const languageFilePath = 'LirkisEduVePn-UI/src/assets/sceneDescription.json';

      console.log("success");
    })
  }
}
