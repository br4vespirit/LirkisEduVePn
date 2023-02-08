import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LoginRequest} from "../../models/login-request.model";
import {UtilsService} from "../../services/utils.service";
import {TransferService} from "../../services/transfer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registration/registration.component.css']
})
export class LoginComponent {

  // @ts-ignore
  form: FormGroup;
  loginSubscription: Subscription = new Subscription();
  profileSubscription: Subscription = new Subscription();

  constructor(private _client: BackendService, private _snackBar: MatSnackBar,
              private _router: Router, private _utils: UtilsService, private _transfer: TransferService) {
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

  login() {
    let request: LoginRequest = new LoginRequest(this.email?.value,
      this.password?.value);

    this.loginSubscription = this._client.login(request).subscribe({
      next: (response) => {
        this._utils.saveToken(response.headers.get("Authorization"));

        let link: string = localStorage.getItem("redirect-url") as string;
        if (link === null)
          link = '/user/profile'; // TODO change redirect
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

  openUnsuccessfulSnackbar(message: string) {
    const snackbarRef = this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  openUpdatedProfileBar(message: string) {
    const snackbarRef = this._snackBar.open(message, '', {
      duration: 5000,
    });
  }
}
