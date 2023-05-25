import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from "../../models/user-profile.model";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from '@angular/material/dialog';
import {JoinQuizComponent} from '../join-quiz/join-quiz.component';
import {HistoryQuizComponent} from '../history-quiz/history-quiz.component';
import {ProfileSettingsComponent} from '../profile-settings/profile-settings.component';
import {Subscription} from "rxjs";
import {TransferService} from "../../services/transfer.service";
import {PreviewTasksComponent} from "../preview-tasks/preview-tasks.component";

/**
 * Component that is used as a start page after logging in
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  /**
   * Profile of a logged-in user
   */
    // @ts-ignore
  profile: UserProfile;

  /**
   * Whether necessary data was loaded
   */
  isLoaded: boolean = false;

  /**
   * Subscription to transfer profile changes
   */
  profileChangesSubscription: Subscription = new Subscription();

  /**
   * Constructor for a component
   * @param _client BackendService instance that sends requests to a server
   * @param matDialog Angular Material component that uses for opening dialogs
   * @param _transfer Field to transfer data between components
   */
  constructor(private _client: BackendService, private matDialog: MatDialog, private _transfer: TransferService) {
  }

  /**
   * Method to retrieve user profile from a local storage
   */
  ngOnInit(): void {
    const parsedProfile = localStorage.getItem("user-profile");
    if (parsedProfile)
      this.profile = JSON.parse(parsedProfile) as UserProfile;
    this.isLoaded = true;

    this.profileChangesSubscription = this._transfer.profileStatus$.subscribe(profile => {
      this.profile = profile;
    })
  }

  ngOnDestroy(): void {
  }

  /**
   * Method to open JoinQuizComponent component
   */
  JoinQuizDialogOpen(){
    this.matDialog.open(JoinQuizComponent);
  }

  /**
   * Method to open HistoryQuizComponent component
   */
  HistoryQuizDialogOpen() {
    this.matDialog.open(HistoryQuizComponent);
  }

  /**
   * Method to open ProfileSettingsComponent component with user profile as a data
   */
  ProfileSettingsDialogOpen() {
    this.matDialog.open(ProfileSettingsComponent, {
      data: this.profile
    });
  }

  /**
   * Method to open PreviewTasksComponent component
   */
  PreviewTasksDialogOpen() {
    this.matDialog.open(PreviewTasksComponent);
  }
}
