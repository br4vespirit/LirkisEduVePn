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

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit, OnDestroy {

  // @ts-ignore
  dataSource: MatTableDataSource;
  displayedColumns = ["firstname", "lastname", "email", "username", "role", "groups", "actions"];

  users: UserProfile[] = [];
  // admin_id: number = 0;

  users_subscription: Subscription = new Subscription();
  confirmation_dialog_subscription: Subscription = new Subscription();
  delete_user_subscription: Subscription = new Subscription();
  updated_user_subscription: Subscription = new Subscription();

  // @ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private _client: BackendService,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private _transfer: TransferService) {

  }

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

  updateDataSource() {
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
  }

  openSuccessfulDeleteBar() {
    this._snackBar.open('User was successfully deleted', "OK", {
      duration: 3000
    })
  }

  openUnsuccessfulDeleteBar() {
    this._snackBar.open('Error occurred when deleting user', "OK", {
      duration: 3000
    })
  }
}
