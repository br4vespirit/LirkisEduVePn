import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TransferService} from "../../services/transfer.service";
import {UserProfile} from "../../models/user-profile.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileUpdate} from "../../models/profile-update.model";
import {BackendService} from "../../services/backend.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Component that defines a dialog for a profile settings
 */
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

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
  constructor(private matDialogRef: MatDialogRef<ProfileSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserProfile,
              private router: Router,
              private _transfer: TransferService,
              private _client: BackendService,
              private _snackBar: MatSnackBar) {
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
   * Gets a currentPassword field from a form group
   */
  get currentPassword() {
    if (this.form)
      return this.form.controls['currentPassword'];
    return null;
  }

  /**
   * Gets a newPassword field from a form group
   */
  get newPassword() {
    if (this.form)
      return this.form.controls['newPassword'];
    return null;
  }

  /**
   * Gets a repeatPassword field from a form group
   */
  get repeatNewPassword() {
    if (this.form)
      return this.form.controls['repeatNewPassword'];
    return null;
  }

  /**
   * While this component is a dialog, this method closes this component
   */
  closeDialog() {
    this.matDialogRef.close();
  }

  /**
   * Method to logout from a system
   */
  logout() {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-profile");
    this._transfer.changeStatus(false);
    this.closeDialog();
    this.router.navigate(["/login"]).then(r => r);
  }

  /**
   * Method to initialize a form for a profile settings
   */
  ngOnInit(): void {
    let profile: UserProfile = this.data;
    this.form = new FormGroup<any>({
      email: new FormControl(profile.email, [Validators.required, Validators.email]),
      nickname: new FormControl(profile.nickname, [Validators.required]),
      firstname: new FormControl(profile.firstname, [Validators.required]),
      lastname: new FormControl(profile.lastname, [Validators.required]),
      currentPassword: new FormControl('', []),
      newPassword: new FormControl('', []),
      repeatNewPassword: new FormControl('', []),
    });
  }

  ngOnDestroy(): void {
    this.matDialogRef.close();
    this.profile_update_subscription.unsubscribe();
  }

  /**
   * Method to get all data from a form and update a profile
   */
  updateProfile() {
    let profile: ProfileUpdate = new ProfileUpdate({
      id: this.data.id,
      email: this.email?.value,
      nickname: this.nickname?.value,
      firstname: this.firstname?.value,
      lastname: this.lastname?.value,
      role: this.data.role,
      currentPassword: this.currentPassword?.value,
      newPassword: this.newPassword?.value,
      repeatNewPassword: this.repeatNewPassword?.value
    })

    let emailChanged = false;
    let passwordChanged = false;
    if (this.data.email != profile.email)
      emailChanged = true;
    if (profile.newPassword != '' && profile.repeatNewPassword != '' && profile.currentPassword != '')
      passwordChanged = true;

    this.profile_update_subscription = this._client.updateProfile(profile).subscribe({
      next: (profile) => {
        if (emailChanged || passwordChanged) {
          if (emailChanged)
            localStorage.setItem("emailChanged", "true");
          if (passwordChanged)
            localStorage.setItem("passwordChanged", "true");
          this.logout();
        } else {
          this._transfer.changeProfile(profile);
          this.openSuccessfulSnackbar();
          localStorage.setItem("user-profile", JSON.stringify(profile));
          this.updateForm(profile);
        }
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
   * Method to clear and update settings form
   * @param profile update user profile
   */
  updateForm(profile: UserProfile) {
    this.form.setValue({
      email: profile.email,
      nickname: profile.nickname,
      firstname: profile.firstname,
      lastname: profile.lastname,
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    })
  }

  /**
   * Opens successful snack bar
   */
  openSuccessfulSnackbar() {
    const snackbarRef = this._snackBar.open('Your profile was successfully updated', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });

  }

  /**
   * Opens unsuccessful snack bar
   */
  openUnsuccessfulSnackbar(message: string) {
    const snackbarRef = this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['snackbar-unsuccessful']
    });
  }
}
