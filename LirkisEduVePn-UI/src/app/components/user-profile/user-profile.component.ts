import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfile} from "../../models/user-profile.model";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from '@angular/material/dialog';
import {JoinQuizComponent} from '../join-quiz/join-quiz.component';
import {CreateQuizComponent} from '../create-quiz/create-quiz.component';
import {HistoryQuizComponent} from '../history-quiz/history-quiz.component';
import {ProfileSettingsComponent} from '../profile-settings/profile-settings.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  // @ts-ignore
  profile: UserProfile;
  isLoaded: boolean = false;

  constructor(private _client: BackendService, private matDialog:MatDialog) {}

  ngOnInit(): void {
    const parsedProfile = localStorage.getItem("user-profile");
    if (parsedProfile)
      this.profile = JSON.parse(parsedProfile) as UserProfile;
    this.isLoaded = true;
  }

  ngOnDestroy(): void {
  }

  JoinQuizDialogOpen(){
    this.matDialog.open(JoinQuizComponent);
  }

  CreateQuizDialogOpen(){
    this.matDialog.open(CreateQuizComponent);
  }

  HistoryQuizDialogOpen(){
    this.matDialog.open(HistoryQuizComponent);
  }

  ProfileSettingsDialogOpen(){
    this.matDialog.open(ProfileSettingsComponent, {
      data: this.profile
    });
  }

}
