import { Component } from '@angular/core';
import {UserProfile} from "../../models/user-profile.model";
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
 // @ts-ignore
 profile: UserProfile = '';
 profileSubscription: Subscription = new Subscription();

 constructor(private _client: BackendService) {}

 ngOnInit(): void {
   this.profileSubscription = this._client.fetchProfile().subscribe(data => {
     this.profile = data as UserProfile;
   })
 }

 ngOnDestroy(): void {
   this.profileSubscription.unsubscribe();
 }
}
