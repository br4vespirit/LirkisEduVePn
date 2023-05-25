import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserProfile} from "../../models/user-profile.model";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialog} from "../dialogs/confirmation-dialog/confirmation-dialog.component";
import {UserSettingsComponent} from "../user-settings/user-settings.component";
import {TransferService} from "../../services/transfer.service";

/**
 * Component that is used as a dashboard for users management
 */
@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit, OnDestroy {

  /**
   * Field to manage users as a table
   */
  // @ts-ignore
  dataSource: MatTableDataSource;

  /**
   * Columns for a table to display
   */
  displayedColumns = ["firstname", "lastname", "email", "username", "role", "groups", "actions"];

  /**
   * List of users profiles to display in a table
   */
  users: UserProfile[] = [];
  // admin_id: number = 0;

  /**
   * Subscription to fetch all users profiles
   */
  users_subscription: Subscription = new Subscription();

  /**
   * Subscription for a confirmation dialog
   */
  confirmation_dialog_subscription: Subscription = new Subscription();

  /**
   * Subscription to delete a user
   */
  delete_user_subscription: Subscription = new Subscription();

  /**
   * Subscription to update a user
   */
  updated_user_subscription: Subscription = new Subscription();

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
   * Method to fetch all users and subscribe to a modification of any users profile
   */
  ngOnInit(): void {
    // let profile = localStorage.getItem('user-profile');
    // if (profile != null)
    //   this.admin_id = JSON.parse(profile).id;
    this.users_subscription = this._client.getAllUsers().subscribe(users => {
      this.users = users as UserProfile[];
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    })
    this.updated_user_subscription = this._transfer.updatedUserStatus$.subscribe(user => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === user.id) {
          this.users[i] = user;
          this.updateDataSource();
          break;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.users_subscription.unsubscribe();
    this.confirmation_dialog_subscription.unsubscribe();
    this.updated_user_subscription.unsubscribe();
    this.delete_user_subscription.unsubscribe();
  }

  /**
   * Method to update user
   * @param id id of a user to update
   */
  editUser(id: number) {
    let profile: UserProfile = new UserProfile();
    for (const element of this.users) {
      if (element.id === id) {
        profile = element;
        break;
      }
    }
    this._dialog.open(UserSettingsComponent, {
      data: profile
    });
  }

  /**
   * Method to delete a user
   * @param id id of a user to delete
   */
  deleteUser(id: number) {
    this.delete_user_subscription = this._client.deleteUserById(id).subscribe({
      complete: () => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id)
            this.users.splice(i, 1);
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
   * Opens a delete dialog
   * @param id user id to delete
   */
  openDeleteDialog(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialog, {
      data: {
        message: "Do you want to delete this user?"
      }
    })

    this.confirmation_dialog_subscription = dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser(id);
      }
    })
  }

  /**
   * Method to update/refresh a table
   */
  updateDataSource() {
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Opens successful snack bar after deleting a user
   */
  openSuccessfulDeleteBar() {
    this._snackBar.open('User was successfully deleted', "OK", {
      duration: 3000
    })
  }

  /**
   * Opens unsuccessful snack bar after deleting a user
   */
  openUnsuccessfulDeleteBar() {
    this._snackBar.open('Error occurred when deleting user', "OK", {
      duration: 3000
    })
  }
}
