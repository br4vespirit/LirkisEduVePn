import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../../services/backend.service";
import {Router} from "@angular/router";
import {TaskSessionInfo} from "../../../models/task-session-info.model";
import {Subscription} from "rxjs";

// TODO: add get also time when each transition was fired

interface FiringAttempt {
  action: string;
  actionFound: boolean;
  successful: boolean;
  actionTargets: string[];
  firedAt: Date;
}

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit, OnDestroy {

  // @ts-ignore
  firringAttempts: FiringAttempt[];
  firring_attempts_subscription: Subscription = new Subscription();
  // @ts-ignore
  sessionData: TaskSessionInfo;
  duration: string = "";

  extended_open: boolean = false;
  loaded: boolean = false;

  from: string = "";

  constructor(private router: Router, private _client: BackendService,) {
    // @ts-ignore
    this.sessionData = this.router.getCurrentNavigation().extras.state.data as TaskSessionInfo;
    // @ts-ignore
    this.from = this.router.getCurrentNavigation().extras.state.from as string;
    this.countDuration()
  }

  ngOnInit(): void {
    this.firring_attempts_subscription = this._client.getFiringAttempts(this.sessionData.id).subscribe(data => {
      this.firringAttempts = data as [];
      this.loaded = true;
    })
  }

  countDuration(): void {
    const startedAt = this.sessionData.startedAt;
    const finishedAt = this.sessionData.finishedAt;

    const durationInMs = new Date(finishedAt).getTime() - new Date(startedAt).getTime();
    const hours = Math.floor(durationInMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationInMs % (1000 * 60)) / 1000);

    if (hours > 0) {
      this.duration += `${hours} h `;
    }
    if (minutes > 0 || hours === 0) {
      this.duration += `${minutes} min `;
    }
    this.duration += `${seconds} sec`;
  }

  ngOnDestroy(): void {
    this.firring_attempts_subscription.unsubscribe();
  }

  change_status() {
    this.extended_open = !this.extended_open;
  }

  close() {
    if (this.from === 'profile') {
      this.router.navigate(["/user/profile"]).then();
    } else if (this.from === 'dashboard') {
      this.router.navigate(["/dashboard/groups-history"]).then();
    }
  }
}
