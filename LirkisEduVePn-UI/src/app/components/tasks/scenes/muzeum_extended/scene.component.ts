import {Component, OnInit} from '@angular/core';

import '../../js/components/collisionDetectorEventHandler.component.js';
import '../../js/components/toggleInfo.component.js';
import '../../js/components/clkMultiEventHandler.component.js';
import '../../js/components/clkSingleEventHandler.component.js';
import '../../js/components/petriNetSim.component.js';
import {TaskFiles} from "../../../../models/task-files.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  // @ts-ignore
  taskFiles: TaskFiles

  constructor(private _router: Router) {
    // @ts-ignore
    this.taskFiles = this._router.getCurrentNavigation()?.extras.state.data as TaskFiles;
    console.log(this.taskFiles)
  }

  ngOnInit(): void {

    // TODO: get language files from database

    // TODO: get pnml file from database

    // TODO: get scene file form database (html file)

  }
}
