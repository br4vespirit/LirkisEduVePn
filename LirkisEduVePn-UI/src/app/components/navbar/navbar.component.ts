import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserProfile} from "../../models/user-profile.model";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  colapse: boolean = false
   // @ts-ignore
  profile: UserProfile;
  profileSubscription: Subscription = new Subscription();

  constructor(private router: Router, private _client: BackendService) {
  }

  ngOnInit(): void {
    this.profileSubscription = this._client.fetchProfile().subscribe(data => {
      this.profile = data as UserProfile;
    })
  }
 
  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
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
    this.router.navigate(["/login"]).then(r => r);
  }
}
