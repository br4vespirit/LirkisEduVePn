import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Group} from "../../models/group.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TransferService} from "../../services/transfer.service";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {GroupTasks} from "../../models/group-tasks.model";
import {TaskNames} from "../../models/task-names.model";

@Component({
  selector: 'app-groups-modification',
  templateUrl: './groups-modification.component.html',
  styleUrls: ['./groups-modification.component.css']
})
export class GroupsModificationComponent implements OnInit, OnDestroy {
  // @ts-ignore
  form: FormGroup;
  roles: string[] = ['STUDENT', 'TEACHER', 'ADMIN']

  tasksSubscription: Subscription = new Subscription();

  profile_update_subscription: Subscription = new Subscription();

  constructor(private matDialogRef: MatDialogRef<GroupsModificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GroupTasks,
              private router: Router,
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

  closeDialog() {
    this.matDialogRef.close();
  }

  ngOnInit(): void {
    let group: GroupTasks = this.data;
    this.form = new FormGroup<any>({
      name: new FormControl(group.name, [Validators.required]),
      tasks: new FormControl(group.tasks, [])
    });

    this.tasksSubscription = this._client.fetchTaskNames().subscribe(data => {
      this._tasks = data as Group[]
      this.autocompleteGroups(group);
    })
  }

  ngOnDestroy(): void {
    this.matDialogRef.close();
    this.profile_update_subscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }

  updateGroup() {
    let group: GroupTasks = new GroupTasks({
      id: this.data.id,
      name: this.name?.value,
      tasks: this.tasks?.value,
    })

    this.profile_update_subscription = this._client.updateGroupFromDashboard(group).subscribe({
      next: (group) => {
        this.openSuccessfulSnackbar();
        this._transfer.changeUpdatedGroup(group);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400)
            this.openUnsuccessfulSnackbar(err.error);
          else
            this.openUnsuccessfulSnackbar("An unexpected error occurred");
        }
      }
    })
  }

  openSuccessfulSnackbar() {
    this._snackBar.open('Group was successfully updated', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });

  }

  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['snackbar-unsuccessful']
    });
  }

  private autocompleteGroups(group: GroupTasks) {
    let ts: number[] = [];
    this._tasks.forEach((task: TaskNames) => {
      group.tasks.forEach((t: TaskNames) => {
        if (task.id === t.id) {
          ts.push(task.id);
        }
      });
    });
    this.form.controls['tasks'].setValue(ts);
  }
}
