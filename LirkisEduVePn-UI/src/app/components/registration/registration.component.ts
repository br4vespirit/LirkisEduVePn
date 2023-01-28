import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationRequest} from "../../models/registration-request.model";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup;

  passwordsMatch: boolean = true;
  // emailExists: boolean = false;

  registrationUserSubscription: Subscription = new Subscription();

  constructor(private _client: BackendService, private _snackBar: MatSnackBar,
              private _router: Router) {
  }

  get username() {
    if (this.form)
      return this.form.controls['username'];
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

  get email() {
    if (this.form)
      return this.form.controls['email'];
    return null;
  }

  get password() {
    if (this.form)
      return this.form.controls['password'];
    return null;
  }

  get confirmPassword() {
    if (this.form)
      return this.form.controls['confirmPassword'];
    return null;
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      username: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.registrationUserSubscription.unsubscribe();
  }

  register() {
    // this.emailExists = false;
    if (this.password?.value != this.confirmPassword?.value) {
      this.passwordsMatch = false;
      return;
    }
    let request: RegistrationRequest = new RegistrationRequest(
      this.username?.value,
      this.email?.value,
      this.password?.value,
      this.firstname?.value,
      this.lastname?.value
    );

    this.registrationUserSubscription = this._client.register(request).subscribe({
      complete: () => {
        this.form.reset({});
        this.openSuccessfulSnackbar();
      },
      error: (response) => {
        // this.emailExists = true;
        this.form.reset({});
        this.openUnsuccessfulSnackbar();
      }
    })

  }

  openSuccessfulSnackbar() {
    const snackbarRef = this._snackBar.open('Registration successful', 'Go to login', {
      duration: 5000,
    });

    snackbarRef.onAction().subscribe(() => {
      this._router.navigate(["/login"]).then(r => r);
      this._snackBar.dismiss();
    });
  }

  openUnsuccessfulSnackbar() {
    const snackbarRef = this._snackBar.open('User with this email is already registered', '', {
      duration: 5000,
    });
  }
}
