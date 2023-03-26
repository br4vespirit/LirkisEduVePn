import {Component, ElementRef, ViewChild} from '@angular/core';

import '../../js/components/collisionDetectorEventHandler.component.js';
import '../../js/components/toggleInfo.component.js';
import '../../js/components/clkMultiEventHandler.component.js';
import '../../js/components/clkSingleEventHandler.component.js';
import '../../js/components/petriNetSim.component.js';
import '../../js/components/sceneLanguage.component.js';
import {TaskFiles} from "../../../../models/task-files.model";
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../../../../services/backend.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-scene',
  templateUrl: './muzeum_habsbourg.component.html',
  styleUrls: ['./muzeum_habsbourg.component.css']
})
export class Muzeum_habsbourgComponent {

  @ViewChild('scene') scene!: ElementRef;

  // @ts-ignore
  taskId: number;
  // @ts-ignore
  taskFiles: TaskFiles
  task_files_subscription: Subscription = new Subscription();


  constructor(private _route: ActivatedRoute, private _client: BackendService) {

    this._route.params.subscribe(params => {
      this.taskId = params['taskId'];
    })

    // @ts-ignore
    this.task_files_subscription = this._client.getTaskFiles(this.taskId).subscribe(data => {
      this.taskFiles = data as TaskFiles;
      TaskFiles.decode(this.taskFiles);

      if (this.taskFiles) {
        // attach petri net sim component to the scene
        const petriNetSimAttr = `finalPlace: final; taskCount: 3; pnmlFile: ${this.taskFiles.pnmlFile}`;
        this.scene.nativeElement.setAttribute('petri-net-sim', petriNetSimAttr);

        // attach language component to the scene
        this.scene.nativeElement.setAttribute('language', `languageFile: ${this.taskFiles.languageFile}; languageVersion: sk`)
      }

    })
  }
}
