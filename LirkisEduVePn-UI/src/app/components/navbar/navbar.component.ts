import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {TransferService} from "../../services/transfer.service";
import {UserProfile} from "../../models/user-profile.model";

/**
 * Component that is used as navbar in the system
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  collapse: boolean = false;

  /**
   * Whether users is logged in or not
   */
  isLogged: boolean = false;

  /**
   * Role of a user
   */
  role: string = "";

  /**
   * Subscription to transfer isLogged value
   */
  loggedSubscription: Subscription = new Subscription();

  /**
   * Subscription to transfer role value
   */
  roleSubscription: Subscription = new Subscription();

  /**
   * Constructor for a component
   * @param _client BackendService instance that sends requests to a server
   * @param router Router field to route between components
   * @param _transfer Field to transfer data between components
   */
  constructor(private router: Router, private _client: BackendService,
              private _transfer: TransferService) {
  }

  /**
   * Method to retrieve JWT token from a local storage if it exists, tries to get user
   * profile is user logged in and sends isLogged and role fields to a transfer service.
   */
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

  /**
   * Shows or hides side menu
   */
  showMenu() {
    this.collapse = !this.collapse
  }

  canCollapse() {
    return this.router.url !== '/login' && this.router.url !== '/register'
  }

  /**
   * Logs out user
   */
  logout() {
    this.collapse = !this.collapse
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-profile");
    this._transfer.changeStatus(false);
    this.router.navigate(["/login"]).then(r => r);
  }
}
