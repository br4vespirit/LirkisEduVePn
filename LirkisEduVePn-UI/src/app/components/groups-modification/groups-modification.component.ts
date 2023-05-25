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

/**
 * Component that is used as a form for group modification
 */
@Component({
  selector: 'app-groups-modification',
  templateUrl: './groups-modification.component.html',
  styleUrls: ['./groups-modification.component.css']
})
export class GroupsModificationComponent implements OnInit, OnDestroy {

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  roles: string[] = ['STUDENT', 'TEACHER', 'ADMIN']

  /**
   * Subscription to fetch tasks
   */
  tasksSubscription: Subscription = new Subscription();

  /**
   * Subscription to update a group
   */
  profile_update_subscription: Subscription = new Subscription();

  /**
   *
   * @param matDialogRef Angular Material component that uses for opening dialogs
   * @param data data that was transfer to this component
   * @param router Router field to route between components
   * @param _transfer Field to transfer data between components
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   */
  constructor(private matDialogRef: MatDialogRef<GroupsModificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GroupTasks,
              private router: Router,
              private _transfer: TransferService,
              private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  /**
   * List of tasks
   */
  _tasks: TaskNames[] = [];

  /**
   * Gets a tasks field from a form group
   */
  get tasks() {
    if (this.form)
      return this.form.controls['tasks'];
    return null;
  }

  /**
   * Gets a name field from a form group
   */
  get name() {
    if (this.form)
      return this.form.controls['name'];
    return null;
  }

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }

  /**
   * Method to retrieve a group to update from a data and fetch all tasks from a database
   */
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

  /**
   * Updates a group
   */
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

  /**
   * Opens successful snack bar
   */
  openSuccessfulSnackbar() {
    this._snackBar.open('Group was successfully updated', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });

  }

  /**
   * Opens unsuccessful snack bar
   */
  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['snackbar-unsuccessful']
    });
  }

  /**
   * Autocompletes form with groups tasks
   * @param group group to autocomplete
   */
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
