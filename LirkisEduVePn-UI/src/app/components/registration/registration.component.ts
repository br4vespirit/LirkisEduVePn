import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationRequest} from "../../models/registration-request.model";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

/**
 * Component that is used as a registration form
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  /**
   * Field to know whether passwords match
   */
  passwordsMatch: boolean = true;

  groupsSubscription: Subscription = new Subscription();

  /**
   * Subscription to register a user
   */
  registrationUserSubscription: Subscription = new Subscription();

  /**
   * Constructor for a component
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   * @param _router Router field to route between components
   */
  constructor(private _client: BackendService, private _snackBar: MatSnackBar,
              private _router: Router) {
  }

  /**
   * Gets a username field from a form group
   */
  get username() {
    if (this.form)
      return this.form.controls['username'];
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
   * Gets an email field from a form group
   */
  get email() {
    if (this.form)
      return this.form.controls['email'];
    return null;
  }

  /**
   * Gets a password field from a form group
   */
  get password() {
    if (this.form)
      return this.form.controls['password'];
    return null;
  }

  /**
   * Gets a confirmPassword field from a form group
   */
  get confirmPassword() {
    if (this.form)
      return this.form.controls['confirmPassword'];
    return null;
  }

  /**
   * Method that inits a registration form
   */
  ngOnInit(): void {
    this.form = new FormGroup<any>({
      username: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.registrationUserSubscription.unsubscribe();
    this.groupsSubscription.unsubscribe();
  }

  /**
   * Method to register a new user
   */
  register() {
    if (this.password?.value != this.confirmPassword?.value) {
      this.passwordsMatch = false;
      return;
    }
    let request: RegistrationRequest = new RegistrationRequest(
      this.username?.value,
      this.email?.value,
      this.password?.value,
      this.firstname?.value,
      this.lastname?.value,
    );
    this.registrationUserSubscription = this._client.register(request).subscribe({
      complete: () => {
        this.form.reset({});
        this.openSuccessfulSnackbar();
      },
      error: () => {
        this.form.reset({});
        this.openUnsuccessfulSnackbar();
      }
    })
  }

  /**
   * Opens successful snack bar
   */
  openSuccessfulSnackbar() {
    const snackbarRef = this._snackBar.open('Registration successful. Go to your mailbox to verify mail', 'Go to login', {
      duration: 5000,
    });

    snackbarRef.onAction().subscribe(() => {
      this._router.navigate(["/login"]).then(r => r);
      this._snackBar.dismiss();
    });
  }

  /**
   * Opens unsuccessful snack bar
   */
  openUnsuccessfulSnackbar() {
    this._snackBar.open('User with this email is already registered', '', {
      duration: 5000,
    });
  }
}
