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

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  // @ts-ignore
  form: FormGroup;
  roles: string[] = ['STUDENT', 'TEACHER', 'ADMIN']

  profile_update_subscription: Subscription = new Subscription();

  constructor(private matDialogRef: MatDialogRef<UserSettingsComponent>,
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

  get role() {
    if (this.form)
      return this.form.controls['role'];
    return null;
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

  closeDialog() {
    this.matDialogRef.close();
  }

  ngOnInit(): void {
    let profile: UserProfile = this.data;
    this.form = new FormGroup<any>({
      email: new FormControl(profile.email, [Validators.required, Validators.email]),
      nickname: new FormControl(profile.nickname, [Validators.required]),
      firstname: new FormControl(profile.firstname, [Validators.required]),
      lastname: new FormControl(profile.lastname, [Validators.required]),
      role: new FormControl(profile.role, [Validators.required])
    });
    this.form.controls['email'].disable();
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
      role: this.role?.value,
    })

    this.profile_update_subscription = this._client.updateUserFromDashboard(profile).subscribe({
      next: (profile) => {
        this.openSuccessfulSnackbar();
        this._transfer.changeUpdatedUser(profile);
        this.updateForm(profile);
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
      role: profile.role
    })
  }

  openSuccessfulSnackbar() {
    this._snackBar.open('Profile was successfully updated', '', {
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
}
