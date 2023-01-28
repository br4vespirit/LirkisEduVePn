import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from "../../models/user-profile.model";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // @ts-ignore
  profile: UserProfile;

  profileSubscription: Subscription = new Subscription();

  constructor(private _client: BackendService) {

  }

  ngOnInit(): void {
    // console.log("Bearer " + localStorage.getItem("jwt-token"))
    this.profileSubscription = this._client.fetchProfile().subscribe(data => {
      this.profile = data as UserProfile;
      console.log(this.profile);
    })
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }
}
