import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {TransferService} from "../../services/transfer.service";
import {GroupTasks} from "../../models/group-tasks.model";
import {GroupsModificationComponent} from "../groups-modification/groups-modification.component";
import {ConfirmationDialog} from '../dialogs/confirmation-dialog/confirmation-dialog.component';

/**
 * Component that is used as a dashboard for management groups
 */
@Component({
  selector: 'app-groups-dashboard',
  templateUrl: './groups-dashboard.component.html',
  styleUrls: ['./groups-dashboard.component.css']
})
export class GroupsDashboardComponent implements OnInit, OnDestroy {

  /**
   * Field to manage groups as a table
   */
  // @ts-ignore
  dataSource: MatTableDataSource;

  /**
   * Columns for a table to display
   */
  displayedColumns = ["name", "tasks", "actions"];

  /**
   * List of groups to display in a table
   */
  groups: GroupTasks[] = [];

  /**
   * Subscription to load all groups from a database
   */
  groups_subscription: Subscription = new Subscription();

  /**
   * Subscription for a confirmation dialog
   */
  confirmation_dialog_subscription: Subscription = new Subscription();

  /**
   * Subscription to delete a group
   */
  delete_group_subscription: Subscription = new Subscription();

  /**
   * Subscription to create a group
   */
  created_group_subscription: Subscription = new Subscription();

  /**
   * Subscription to update a group
   */
  updated_group_subscription: Subscription = new Subscription();


  /**
   * Paginator to a table
   */
    // @ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;

  /**
   * Constructor for a component
   * @param _dialog Angular Material component that uses for opening dialogs
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   * @param _transfer Field to transfer data between components
   */
  constructor(private _client: BackendService,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private _transfer: TransferService) {

  }

  /**
   * Method to fetch all groups, subscribe to a creation and transfer of a group from another component
   * and subscribe to a modification of a group
   */
  ngOnInit(): void {
    this.groups_subscription = this._client.fetchGroupsWithTasks().subscribe(data => {
        this.groups = data as GroupTasks[];
        this.dataSource = new MatTableDataSource(this.groups);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.created_group_subscription = this._transfer.createdGroupStatus$.subscribe(group => {
      this.groups.push(group);
      this.updateDataSource();
    });
    this.updated_group_subscription = this._transfer.updatedGroupStatus$.subscribe(group => {
      const index = this.groups.findIndex(g => g.id === group.id);
      this.groups.splice(index, 1, group);
      this.updateDataSource();
    });
  }

  ngOnDestroy(): void {
    this.confirmation_dialog_subscription.unsubscribe();
    this.created_group_subscription.unsubscribe();
    this.updated_group_subscription.unsubscribe();
    this.delete_group_subscription.unsubscribe();
  }

  /**
   * Opens a dialog to update a group
   * @param id group id to update
   */
  openUpdateDialog(id: number) {
    let groupTasks: GroupTasks = new GroupTasks();
    for (const element of this.groups) {
      if (element.id === id) {
        groupTasks = element;
        break;
      }
    }
    this._dialog.open(GroupsModificationComponent, {
      data: groupTasks
    });
  }

  /**
   * Opens a delete dialog
   * @param id group id to delete
   */
  openDeleteDialog(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialog, {
      data: {
        message: "Do you want to delete this group?"
      }
    })

    this.confirmation_dialog_subscription = dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteGroup(id);
      }
    })
  }

  /**
   * Method to delete a group
   * @param id id of a group to delete
   */
  deleteGroup(id: number) {
    this.delete_group_subscription = this._client.deleteGroupById(id).subscribe({
      complete: () => {
        for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i].id === id)
            this.groups.splice(i, 1);
        }
        this.updateDataSource();
        this.openSuccessfulDeleteBar();
      },
      error: () => {
        this.openUnsuccessfulDeleteBar();
      }
    })
  }

  /**
   * Method to update/refresh a table
   */
  updateDataSource() {
    this.dataSource.data = this.groups;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Opens successful snack bar after deleting a group
   */
  openSuccessfulDeleteBar() {
    this._snackBar.open('Group was successfully deleted', "OK", {
      duration: 3000
    })
  }

  /**
   * Opens unsuccessful snack bar after deleting a group
   */
  openUnsuccessfulDeleteBar() {
    this._snackBar.open('Error occurred when deleting group', "OK", {
      duration: 3000
    })
  }

}
