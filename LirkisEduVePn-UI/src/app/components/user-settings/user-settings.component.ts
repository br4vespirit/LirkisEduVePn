import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserProfile} from "../../models/user-profile.model";
import {Router} from "@angular/router";
import {TransferService} from "../../services/transfer.service";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProfileUpdate} from "../../models/profile-update.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Group} from 'src/app/models/group.model';

/**
 * Component that defines a dialog for a user settings (For admins and teacher)
 */
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  /**
   * List with available roles in the system
   */
  roles: string[] = ['STUDENT', 'TEACHER', 'ADMIN']

  /**
   * Subscription to fetch all groups from a database
   */
  groupsSubscription: Subscription = new Subscription();

  /**
   * Subscription to update user profile
   */
  profile_update_subscription: Subscription = new Subscription();

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that uses for opening dialogs
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   * @param data data that was transfer to this component
   * @param router Router field to route between components
   * @param _transfer Field to transfer data between components
   */
  constructor(private matDialogRef: MatDialogRef<UserSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserProfile,
              private router: Router,
              private _transfer: TransferService,
              private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  /**
   * List with all groups
   */
  _groups: Group[] = [];

  /**
   * Gets a groups field from a form group
   */
  get groups() {
    if (this.form)
      return this.form.controls['groups'];
    return null;
  }

  /**
   * Gets an email field from a form group
   */
  get email() {
    if (this.form)
      return this.form.controls['email'];
    return null;
  }

  /**
   * Gets a nickname field from a form group
   */
  get nickname() {
    if (this.form)
      return this.form.controls['nickname'];
    return null;
  }

  /**
   * Gets a role field from a form group
   */
  get role() {
    if (this.form)
      return this.form.controls['role'];
    return null;
  }

  /**
   * Gets a firstname field from a form group
   */
  get firstname() {
    if (this.form)
      return this.form.controls['firstname'];
    return null;
  }

  /**
   * Gets a lastname field from a form group
   */
  get lastname() {
    if (this.form)
      return this.form.controls['lastname'];
    return null;
  }

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }

  /**
   * Method to get user profile, init user profile modification form and fetch all
   * groups from a database
   */
  ngOnInit(): void {
    let profile: UserProfile = this.data;
    console.log(profile.groups)
    this.form = new FormGroup<any>({
      email: new FormControl(profile.email, [Validators.required, Validators.email]),
      nickname: new FormControl(profile.nickname, [Validators.required]),
      firstname: new FormControl(profile.firstname, [Validators.required]),
      lastname: new FormControl(profile.lastname, [Validators.required]),
      role: new FormControl(profile.role, [Validators.required]),
      groups: new FormControl('', [])
    });
    this.form.controls['email'].disable();

    this.groupsSubscription = this._client.getGroups().subscribe(data => {
      this._groups = data as Group[]
      this.autocompleteGroups(profile);
    })
  }

  ngOnDestroy(): void {
    this.matDialogRef.close();
    this.profile_update_subscription.unsubscribe();
    this.groupsSubscription.unsubscribe();
  }

  /**
   * Method to update user profile
   */
  updateProfile() {
    let profile: ProfileUpdate = new ProfileUpdate({
      id: this.data.id,
      email: this.email?.value,
      nickname: this.nickname?.value,
      firstname: this.firstname?.value,
      lastname: this.lastname?.value,
      role: this.role?.value,
      groups: this.groups?.value,
    })

    this.profile_update_subscription = this._client.updateUserFromDashboard(profile).subscribe({
      next: (profile) => {
        this.openSuccessfulSnackbar();
        this._transfer.changeUpdatedUser(profile);
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
    this._snackBar.open('Profile was successfully updated', '', {
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
   * Method to autocomplete user groups field with his current groups
   * @param profile profile of a current user
   */
  private autocompleteGroups(profile: UserProfile) {
    let gr: Group[] = [];
    this._groups.forEach((group: Group) => {
      profile.groups.forEach((g: Group) => {
        if (g.id === group.id) {
          gr.push(group);
        }
      });
    });
    this.form.controls['groups'].setValue(gr);
  }
}
