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

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup;

  profile_update_subscription: Subscription = new Subscription();

  constructor(private matDialogRef: MatDialogRef<ProfileSettingsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserProfile,
              private router: Router,
              private _transfer: TransferService,
              private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  get email() {
    if (this.form)
      return this.form.controls['email'];
    return null;
  }

  get nickname() {
    if (this.form)
      return this.form.controls['nickname'];
    return null;
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  logout() {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-profile");
    this._transfer.changeStatus(false);
    this.closeDialog();
    this.router.navigate(["/login"]).then(r => r);
  }

  get firstname() {
    if (this.form)
      return this.form.controls['firstname'];
    return null;
  }

  get lastname() {
    if (this.form)
      return this.form.controls['lastname'];
    return null;
  }

  get currentPassword() {
    if (this.form)
      return this.form.controls['currentPassword'];
    return null;
  }

  get newPassword() {
    if (this.form)
      return this.form.controls['newPassword'];
    return null;
  }

  get repeatNewPassword() {
    if (this.form)
      return this.form.controls['repeatNewPassword'];
    return null;
  }

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

  openSuccessfulSnackbar() {
    const snackbarRef = this._snackBar.open('Your profile was successfully updated', '', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });

  }

  openUnsuccessfulSnackbar(message: string) {
    const snackbarRef = this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['snackbar-unsuccessful']
    });
  }
}
