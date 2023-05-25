import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {UserProfile} from "../../models/user-profile.model";
import {TaskSessionInfo} from "../../models/task-session-info.model";
import {Router} from "@angular/router";

/**
 * Component that is used as a dialog to represent user sessions
 */
@Component({
  selector: 'app-history-quiz',
  templateUrl: './history-quiz.component.html',
  styleUrls: ['./history-quiz.component.css']
})
export class HistoryQuizComponent implements OnInit, OnDestroy {

  /**
   * Subscription to fetch task sessions
   */
  task_sessions_subscription: Subscription = new Subscription();

  /**
   * Profile of a current user
   */
  // @ts-ignore
  profile: UserProfile;

  /**
   * List of a user sessions
   */
  sessions: TaskSessionInfo[] = [];

  /**
   * List of a sessions represented on a current page
   */
  current_sessions: TaskSessionInfo[] = [];

  /**
   * Total pages
   */
  max_pages: number = 0;

  /**
   * Current page
   */
  page: number = 0;

  /**
   * Items per page
   */
  items_per_page: number = 5;

  /**
   * Constructor for a component
   * @param matDialogRef Angular Material component that uses for opening dialogs
   * @param _client BackendService instance that sends requests to a server
   * @param _router Router field to route between components
   */
  constructor(private matDialogRef: MatDialogRef<HistoryQuizComponent>,
              private _client: BackendService,
              private _router: Router) {
  }

  /**
   * Method to load profile from a local storage and read all users task sessions
   */
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

  /**
   * Moves to a previous page
   */
  prev_sessions() {
    this.page--;
    this.current_sessions = this.sessions.slice(this.page * this.items_per_page,
      Math.min(this.sessions.length, (this.page + 1) * this.items_per_page));
  }

  /**
   * Moves to a next page
   */
  next_sessions() {
    this.page++;
    this.current_sessions = this.sessions.slice(this.page * this.items_per_page,
      Math.min(this.sessions.length, (this.page + 1) * this.items_per_page));
  }

  /**
   * Opens preview of a chosen session
   * @param session chosen session
   */
  open_preview(session: TaskSessionInfo) {
    this._router.navigate(["/history/session"], {state: {data: session, from: "profile"}}).then();
    this.closeDialog();
  }
}
