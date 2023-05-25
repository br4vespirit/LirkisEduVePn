import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateQuizComponent} from "../create-quiz/create-quiz.component";
import {CreateSceneComponent} from "../create-scene/create-scene.component";
import {CreateTaskComponent} from "../create-task/create-task.component";
import {Router} from "@angular/router";

/**
 * Component that is used as a form for creating tasks in a system
 */
@Component({
  selector: 'app-users-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  /**
   * Constructor for a component
   * @param matDialog Angular Material component that uses for opening dialogs
   * @param _router Router field to route between components
   */
  constructor(private matDialog: MatDialog, private _router: Router) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  /**
   * Opens CreateQuizComponent dialog
   * @constructor
   */
  CreateScenarioDialogOpen() {
    this.matDialog.open(CreateQuizComponent);
  }

  /**
   * Opens CreateSceneComponent dialog
   * @constructor
   */
  CreateSceneDialogOpen() {
    this.matDialog.open(CreateSceneComponent);
  }

  /**
   * Opens CreateTaskComponent dialog
   * @constructor
   */
  CreateTaskDialogOpen() {
    this.matDialog.open(CreateTaskComponent);
  }

  /**
   * Routes to a '/dashboard/users' URL
   * @constructor
   */
  UsersDashboardOpen() {
    this._router.navigate(['/dashboard/users']).then();
  }

  /**
   * Routes to a '/dashboard/groups' URL
   * @constructor
   */
  GroupsTasksOpen() {
    this._router.navigate(['/dashboard/groups']).then();
  }

  /**
   * Routes to a '/dashboard/groups-history' URL
   * @constructor
   */
  GroupsHistoryOpen() {
    this._router.navigate(['/dashboard/groups-history']).then();
  }
}
