import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LoginRequest} from "../../models/login-request.model";
import {UtilsService} from "../../services/utils.service";
import {TransferService} from "../../services/transfer.service";

/**
 * Component that is used to display a login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registration/registration.component.css']
})
export class LoginComponent {

  /**
   * Represents a collection of form controls that are logically grouped together. It provides a convenient way to manage and validate multiple form controls as a single unit.
   */
  // @ts-ignore
  form: FormGroup;

  /**
   * Subscription to preform signing in
   */
  loginSubscription: Subscription = new Subscription();

  /**
   * Subscription to load user profile
   */
  profileSubscription: Subscription = new Subscription();

  /**
   * Constructor for a component
   * @param _client BackendService instance that sends requests to a server
   * @param _snackBar Angular Material component that uses for opening snack bars
   * @param _router Router field to route between components
   * @param _utils Utils field that provides some help methods
   * @param _transfer Field to transfer data between components
   */
  constructor(private _client: BackendService, private _snackBar: MatSnackBar,
              private _router: Router, private _utils: UtilsService, private _transfer: TransferService) {
  }

  /**
   * Gets a email field from a form group
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
   * Method to validate whether user was redirected cause of changing profile
   * data or not and initializes signing in form
   */
  ngOnInit(): void {
    this.checkProfileUpdate();
    this.form = new FormGroup<any>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  /**
   * Method that performs signing in
   */
  login() {
    let request: LoginRequest = new LoginRequest(this.email?.value,
      this.password?.value);

    this.loginSubscription = this._client.login(request).subscribe({
      next: (response) => {
        this._utils.saveToken(response.headers.get("Authorization"));

        let link: string = localStorage.getItem("redirect-url") as string;
        if (link === null)
          link = '/user/profile';
        localStorage.removeItem("redirect-url");

        this.profileSubscription = this._client.fetchProfile().subscribe(profile => {
          localStorage.setItem("user-profile", JSON.stringify(profile));
          this._transfer.changeRole(profile.role);
          this._transfer.changeStatus(true);
          this._router.navigateByUrl(link).then(r => r);
        });
      },
      error: (response) => {
        if (response.status === 401 || response.status === 403)
          this.openUnsuccessfulSnackbar(response.error);
        else
          this.openUnsuccessfulSnackbar("An unexpected error occurred");
      }
    })
  }

  /**
   * Checks whether user was redirected cause of changing profile data or not
   */
  checkProfileUpdate() {
    if (localStorage.getItem("emailChanged") != null && localStorage.getItem("passwordChanged") != null)
      this.openUpdatedProfileBar("Your login data were changed.\nConfirm your email in your mailbox");
    else if (localStorage.getItem("emailChanged") != null)
      this.openUpdatedProfileBar("Your email was changed changed.\nConfirm it in your mailbox");
    else if (localStorage.getItem("passwordChanged") != null)
      this.openUpdatedProfileBar("Your password was changed.\nYou can now log in");
    localStorage.removeItem("emailChanged");
    localStorage.removeItem("passwordChanged");
  }

  /**
   * Opens unsuccessful snack bar with a provided message
   * @param message message to show
   */
  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  /**
   * Opens successful snack bar with a provided message
   * @param message message to show
   */
  openUpdatedProfileBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }
}
