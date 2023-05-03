import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TaskSessionInfo} from "../../models/task-session-info.model";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-group-sessions',
  templateUrl: './group-sessions.component.html',
  styleUrls: ['./group-sessions.component.css']
})
export class GroupSessionsComponent implements OnInit, OnDestroy {

  groupId: number = 0;

  task_sessions_subscription: Subscription = new Subscription();

  sessions: TaskSessionInfo[] = [];

  current_sessions: TaskSessionInfo[] = [];
  max_pages: number = 0;
  page: number = 0;
  items_per_page: number = 5;

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

  navigateBack() {
    this._router.navigate(['/dashboard/groups-history']).then();
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
    this._router.navigate(["/history/session"], {state: {data: session, from: "dashboard"}}).then();
  }
}
