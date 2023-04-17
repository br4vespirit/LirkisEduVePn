import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {TransferService} from "../../services/transfer.service";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupTasks} from "../../models/group-tasks.model";
import {TaskNames} from "../../models/task-names.model";

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, OnDestroy {
  // @ts-ignore
  form: FormGroup;
  tasksSubscription: Subscription = new Subscription();
  create_group_subscription: Subscription = new Subscription();

  constructor(private router: Router,
              private _transfer: TransferService,
              private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  _tasks: TaskNames[] = [];

  get tasks() {
    if (this.form)
      return this.form.controls['tasks'];
    return null;
  }

  get name() {
    if (this.form)
      return this.form.controls['name'];
    return null;
  }

  ngOnInit(): void {
    this.tasksSubscription = this._client.fetchTaskNames().subscribe(data => {
      this._tasks = data as TaskNames[];
    })
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      tasks: new FormControl('', []),
    });
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  createGroup() {
    let group: GroupTasks = new GroupTasks();
    group.name = this.name?.value;
    group.tasks = this.tasks?.value;

    this.create_group_subscription = this._client.createGroup(group).subscribe({
      next: (response) => {
        this._transfer.changeCreatedGroup(response);
      },
      complete: () => {
        this.openSuccessfulSnackbar();
        this.form.reset({});
      },
      error: () => {
        this.openUnsuccessfulSnackbar();
      }
    });
  }

  openSuccessfulSnackbar() {
    this._snackBar.open('Group was successfully created', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }

  openUnsuccessfulSnackbar() {
    this._snackBar.open('Error occurred when creating a new group', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }

  // openUnsuccessfulSnackbar(message: string) {
  //   this._snackBar.open(message, '', {
  //     duration: 5000,
  //     panelClass: ['snackbar-unsuccessful']
  //   });
  // }

}
