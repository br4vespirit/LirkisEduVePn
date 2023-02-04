import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {TransferService} from "../../services/transfer.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  colapse: boolean = false;
  isLogged: boolean = false;

  loggedSubscription: Subscription = new Subscription();

  constructor(private router: Router, private _client: BackendService,
              private _transfer: TransferService) {
  }

  // TODO fix navbar when user logged out it still shows in navbar profile and logout buttons
  ngOnInit(): void {
    if (localStorage.getItem("jwt-token"))
      this.isLogged = true;
    this.loggedSubscription = this._transfer.loginStatus$.subscribe(value => {
      this.isLogged = value;
    })
  }

  ngOnDestroy(): void {
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
