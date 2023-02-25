import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {TransferService} from "../../services/transfer.service";
import {UserProfile} from "../../models/user-profile.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  colapse: boolean = false;
  isLogged: boolean = false;
  role: string = "";

  loggedSubscription: Subscription = new Subscription();
  roleSubscription: Subscription = new Subscription();

  constructor(private router: Router, private _client: BackendService,
              private _transfer: TransferService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("jwt-token"))
      this.isLogged = true;

    let user_profile_presents = localStorage.getItem("user-profile")
    if (user_profile_presents) {
      let profile: UserProfile = JSON.parse(user_profile_presents);
      this.role = profile.role;
    }

    this.loggedSubscription = this._transfer.loginStatus$.subscribe(value => {
      this.isLogged = value;
    });
    this.roleSubscription = this._transfer.roleStatus$.subscribe(role => {
      this.role = role;
    })
  }

  ngOnDestroy(): void {
    this.loggedSubscription.unsubscribe();
    this.roleSubscription.unsubscribe();
  }

  showMenu() {
    this.colapse = !this.colapse
  }

  canColapse() {
    return this.router.url !== '/login' && this.router.url !== '/register'
  }

  logout() {
    this.colapse = !this.colapse
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-profile");
    this._transfer.changeStatus(false);
    this.router.navigate(["/login"]).then(r => r);
  }
}
