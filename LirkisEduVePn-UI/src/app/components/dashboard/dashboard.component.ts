import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateQuizComponent} from "../create-quiz/create-quiz.component";
import {CreateSceneComponent} from "../create-scene/create-scene.component";
import {CreateTaskComponent} from "../create-task/create-task.component";

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private matDialog: MatDialog) {
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
}
