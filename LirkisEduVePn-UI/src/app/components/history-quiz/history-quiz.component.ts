import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {UserProfile} from "../../models/user-profile.model";
import {TaskSessionInfo} from "../../models/task-session-info.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-history-quiz',
  templateUrl: './history-quiz.component.html',
  styleUrls: ['./history-quiz.component.css']
})
export class HistoryQuizComponent implements OnInit, OnDestroy {

  task_sessions_subscription: Subscription = new Subscription();

  // @ts-ignore
  profile: UserProfile;
  sessions: TaskSessionInfo[] = [];

  current_sessions: TaskSessionInfo[] = [];
  max_pages: number = 0;
  page: number = 0;
  items_per_page: number = 5;

  constructor(private matDialogRef: MatDialogRef<HistoryQuizComponent>,
              private _client: BackendService,
              private _router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.profile = JSON.parse(localStorage.getItem("user-profile")) as UserProfile;
    this.task_sessions_subscription = this._client.getTaskSessionsInfo(this.profile.id).subscribe(data => {
      this.sessions = data as TaskSessionInfo[];
      this.max_pages = Math.ceil(this.sessions.length / this.items_per_page);
      this.current_sessions = this.sessions.slice(0, Math.min(this.sessions.length, this.items_per_page));
    })
  }

  ngOnDestroy(): void {
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  prev_sessions() {
    this.page--;
    this.current_sessions = this.sessions.slice(this.page * this.items_per_page,
      Math.min(this.sessions.length, (this.page + 1) * this.items_per_page));
  }

  next_sessions() {
    this.page++;
    this.current_sessions = this.sessions.slice(this.page * this.items_per_page,
      Math.min(this.sessions.length, (this.page + 1) * this.items_per_page));
  }

  open_preview(session: TaskSessionInfo) {
    this._router.navigate(["/history/session"], {state: {data: session}}).then();
    this.closeDialog();
  }
}
