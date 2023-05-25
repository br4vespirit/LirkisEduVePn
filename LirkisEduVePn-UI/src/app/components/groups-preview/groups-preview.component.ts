import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from "../../models/user-profile.model";
import {Group} from "../../models/group.model";
import {Router} from "@angular/router";

/**
 * Component that is used as a form for group modification
 */
@Component({
  selector: 'app-groups-preview',
  templateUrl: './groups-preview.component.html',
  styleUrls: ['./groups-preview.component.css']
})
export class GroupsPreviewComponent implements OnInit, OnDestroy {

  /**
   * Profile of a current user
   */
  // @ts-ignore
  profile: UserProfile;

  /**
   * List of a user groups
   */
  groups: Group[] = [];

  constructor(private _route: Router) {
  }

  /**
   * Method to parse user groups from a user profile
   */
  ngOnInit() {
    let prof = localStorage.getItem("user-profile");
    if (prof != null) {
      this.profile = JSON.parse(prof) as UserProfile;
      this.groups = this.profile.groups;
    }
  }

  ngOnDestroy() {

  }

  /**
   * Method to redirect to a "/dashboard/group/sessions" component with a group id inside data
   * @param groupId groups id to send to a next component
   */
  directToTaskSessions(groupId: number) {
    this._route.navigate(["/dashboard/group/sessions"], {state: {data: groupId}}).then();
  }

  /**
   * Navigates back to a dashboard component
   */
  navigateBack() {
    this._route.navigate(["/dashboard"]).then();
  }
}
