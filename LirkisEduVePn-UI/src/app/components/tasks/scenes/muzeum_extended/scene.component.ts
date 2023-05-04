import {Component, ElementRef, ViewChild} from '@angular/core';

import '../../js/components/collisionDetectorEventHandler.component.js';
import '../../js/components/toggleInfo.component.js';
import '../../js/components/clkMultiEventHandler.component.js';
import '../../js/components/clkSingleEventHandler.component.js';
import '../../js/components/petriNetSim.component.js';
import '../../js/components/sceneLanguage.component.js';
import '../../js/components/label.component.js';
import '../../js/components/toggleLabelVisibility.component.js';
import {TaskFiles} from "../../../../models/task-files.model";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../../../../services/backend.service";
import {Subscription} from "rxjs";
import {TaskRequest} from "../../../../models/task-request.model";

import {transitions, places} from "./scripts/sceneScript";


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent {

  @ViewChild('scene') scene!: ElementRef;

  // @ts-ignore
  taskId: number;
  language: string = "";
  // @ts-ignore
  taskFiles: TaskFiles
  task_files_subscription: Subscription = new Subscription();


  constructor(private _route: ActivatedRoute, private _client: BackendService) {

    this._route.params.subscribe(params => {
      this.taskId = params['taskId'];
      this.language = params['language'];

      this.getTaskFiles();
    })

    // @ts-ignore
    window.transitions = transitions;
    // @ts-ignore
    window.places = places;
  }

  private getTaskFiles() {
    // @ts-ignore
    let request: TaskRequest = new TaskRequest({
      taskId: this.taskId,
      language: this.language
    })
    console.log(request);
    this.task_files_subscription = this._client.getTaskFiles(request).subscribe(data => {
      this.taskFiles = data as TaskFiles;
      TaskFiles.decode(this.taskFiles);

      if (this.taskFiles) {
        // attach petri net sim component to the scene
        const petriNetSimAttr = {
          pnmlFile: this.taskFiles.pnmlFile,
          taskId: this.taskId
        };
        this.scene.nativeElement.setAttribute('petri-net-sim', petriNetSimAttr);

        // attach language component to the scene
        this.scene.nativeElement.setAttribute('language', `languageFile: ${this.taskFiles.languageFile}`)
      }

    })
  }
}
