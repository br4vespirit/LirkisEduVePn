import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {TransferService} from "../../services/transfer.service";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupTasks} from "../../models/group-tasks.model";
import {TaskNames} from "../../models/task-names.model";

/**
 * Component that is used as a form for creating groups
 */
@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, OnDestroy {

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  /**
   * Subscription to get a list of tasks
   */
  tasksSubscription: Subscription = new Subscription();

  /**
   * Subscription for creation of groups
   */
  create_group_subscription: Subscription = new Subscription();

  /**
   * Constructor for a component
   * @param router Router field to route between components
   * @param _transfer Service to transfer data between components
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   */
  constructor(private router: Router,
              private _transfer: TransferService,
              private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  /**
   * List of tasks
   */
  _tasks: TaskNames[] = [];

  /**
   * Gets a list of tasks from a form group
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
   * Method that fetch all tasks from a database and then inits a
   * form group for creating a scenario with name and list of tasks
   */
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

  /**
   * Submits the form with the group to create
   */
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

  /**
   * Opens successful snack bar
   */
  openSuccessfulSnackbar() {
    this._snackBar.open('Group was successfully created', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }

  /**
   * Opens unsuccessful snack bar
   */
  openUnsuccessfulSnackbar() {
    this._snackBar.open('Error occurred when creating a new group', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }

}
