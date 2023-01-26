import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import { LoginRequest } from 'src/app/models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registration/registration.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  form!: FormGroup;

  loginUserSubscription: Subscription = new Subscription();

  constructor(private _client: BackendService, private _snackBar: MatSnackBar, private _router: Router) {}

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

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.loginUserSubscription.unsubscribe();
  }

  login() {
    let request: LoginRequest = new LoginRequest(
      this.email?.value,
      this.password?.value);

    this.loginUserSubscription = this._client.loginUser(request).subscribe({
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
    const snackbarRef = this._snackBar.open('Login successful', 'Go to home', {
      duration: 5000,
    });

    snackbarRef.onAction().subscribe(() => {
      this._router.navigate(["/home"]).then(r => r);
      this._snackBar.dismiss();
    });
  }

  openUnsuccessfulSnackbar() {
    const snackbarRef = this._snackBar.open('User with those credentials doesnt exist', '', {
      duration: 5000,
    });
  }
}
