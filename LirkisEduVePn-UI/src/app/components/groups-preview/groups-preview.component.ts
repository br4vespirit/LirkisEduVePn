import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from "../../models/user-profile.model";
import {Group} from "../../models/group.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-groups-preview',
  templateUrl: './groups-preview.component.html',
  styleUrls: ['./groups-preview.component.css']
})
export class GroupsPreviewComponent implements OnInit, OnDestroy {

  // @ts-ignore
  profile: UserProfile;
  groups: Group[] = [];

  constructor(private _route: Router) {
  }

  ngOnInit() {
    let prof = localStorage.getItem("user-profile");
    if (prof != null) {
      this.profile = JSON.parse(prof) as UserProfile;
      this.groups = this.profile.groups;
    }
  }

  ngOnDestroy() {

  }

  directToTaskSessions(groupId: number) {
    this._route.navigate(["/dashboard/group/sessions"], {state: {data: groupId}}).then();
  }

  navigateBack() {
    this._route.navigate(["/dashboard"]).then();
  }
}
