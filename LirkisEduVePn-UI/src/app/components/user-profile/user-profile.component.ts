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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // @ts-ignore
  profile: UserProfile;
  isLoaded: boolean = false;

  profileChangesSubscription: Subscription = new Subscription();

  constructor(private _client: BackendService, private matDialog: MatDialog, private _transfer: TransferService) {
  }

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

  JoinQuizDialogOpen(){
    this.matDialog.open(JoinQuizComponent);
  }

  HistoryQuizDialogOpen() {
    this.matDialog.open(HistoryQuizComponent);
  }

  ProfileSettingsDialogOpen() {
    this.matDialog.open(ProfileSettingsComponent, {
      data: this.profile
    });
  }

  PreviewTasksDialogOpen() {
    this.matDialog.open(PreviewTasksComponent);
  }
}
