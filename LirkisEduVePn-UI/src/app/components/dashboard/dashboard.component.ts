import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateQuizComponent} from "../create-quiz/create-quiz.component";
import {CreateSceneComponent} from "../create-scene/create-scene.component";
import {CreateTaskComponent} from "../create-task/create-task.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private matDialog: MatDialog, private _router: Router) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  CreateScenarioDialogOpen() {
    this.matDialog.open(CreateQuizComponent);
  }

  CreateSceneDialogOpen() {
    this.matDialog.open(CreateSceneComponent);
  }

  CreateTaskDialogOpen() {
    this.matDialog.open(CreateTaskComponent);
  }

  UsersDashboardOpen() {
    this._router.navigate(['/dashboard/users']).then();
  }

  GroupsTasksOpen() {
    this._router.navigate(['/dashboard/groups']).then();
  }

  GroupsHistoryOpen() {
    this._router.navigate(['/dashboard/groups-history']).then();
  }
}
