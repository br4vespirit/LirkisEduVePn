import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TaskSessionInfo} from "../../models/task-session-info.model";
import {BackendService} from "../../services/backend.service";

/**
 * Component that is used to show a list of a task sessions of current group
 */
@Component({
  selector: 'app-group-sessions',
  templateUrl: './group-sessions.component.html',
  styleUrls: ['./group-sessions.component.css']
})
export class GroupSessionsComponent implements OnInit, OnDestroy {

  /**
   * Id of a group to load sessions from
   */
  groupId: number = 0;

  /**
   * Subscription to load task sessions for a current group
   */
  task_sessions_subscription: Subscription = new Subscription();

  /**
   * List of loaded sessions
   */
  sessions: TaskSessionInfo[] = [];

  /**
   * List of sessions that are in the current page
   */
  current_sessions: TaskSessionInfo[] = [];

  /**
   * Pages number
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
   * Constructor for a component. Retrieves group id from a link on which this page was opened
   * and loads all task sessions belongs to this group.
   * @param _router Router field to route between components
   * @param _client BackendService instance that sends requests to a server
   */
  constructor(private _router: Router, private _client: BackendService) {
    // @ts-ignore
    this.groupId = this._router.getCurrentNavigation().extras.state.data as number;
    this.task_sessions_subscription = this._client.getTaskSessionsInfoByGroups(this.groupId).subscribe(data => {
      this.sessions = data as TaskSessionInfo[];
      this.max_pages = Math.ceil(this.sessions.length / this.items_per_page);
      this.current_sessions = this.sessions.slice(0, Math.min(this.sessions.length, this.items_per_page));
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  /**
   * Navigates back to a component where this component was chosen
   */
  navigateBack() {
    this._router.navigate(['/dashboard/groups-history']).then();
  }

  /**
   * Loads previous page
   */
  prev_sessions() {
    this.page--;
    this.current_sessions = this.sessions.slice(this.page * this.items_per_page,
      Math.min(this.sessions.length, (this.page + 1) * this.items_per_page));
  }

  /**
   * Loads next page
   */
  next_sessions() {
    this.page++;
    this.current_sessions = this.sessions.slice(this.page * this.items_per_page,
      Math.min(this.sessions.length, (this.page + 1) * this.items_per_page));
  }

  /**
   * Opens chosen session for a preview
   * @param session chosen session
   */
  open_preview(session: TaskSessionInfo) {
    this._router.navigate(["/history/session"], {state: {data: session, from: "dashboard"}}).then();
  }
}
