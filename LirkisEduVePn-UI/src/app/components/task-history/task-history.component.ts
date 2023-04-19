import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {TaskSessionInfo} from "../../models/task-session-info.model";

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

  firring_attempts_subscription: Subscription = new Subscription();
  // @ts-ignore
  firringAttempts: FiringAttempt[];
  // @ts-ignore
  sessionData: TaskSessionInfo;
  duration: string = "";

  current_attempts: FiringAttempt[] = [];
  max_pages: number = 0;
  page: number = 0;
  items_per_page: number = 10;

  // TODO: get info about task (task name)
  // TODO: get session duration and if session was successfull or not

  constructor(private router: Router, private _client: BackendService,) {
    // @ts-ignore
    this.sessionData = this.router.getCurrentNavigation().extras.state.data as TaskSessionInfo;
    this.countDuration()
  }

  ngOnDestroy(): void {
    this.firring_attempts_subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.firring_attempts_subscription = this._client.getFiringAttempts(this.sessionData.id).subscribe(data => {
      this.firringAttempts = data as [];
      this.max_pages = Math.ceil(this.firringAttempts.length / this.items_per_page);
      this.current_attempts = this.firringAttempts.slice(0, Math.min(this.firringAttempts.length, this.items_per_page));
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

  prev_attempts() {
    this.page--;
    this.current_attempts = this.firringAttempts.slice(this.page * this.items_per_page,
      Math.min(this.firringAttempts.length, (this.page + 1) * this.items_per_page));
  }

  next_attempts() {
    this.page++;
    this.current_attempts = this.firringAttempts.slice(this.page * this.items_per_page,
      Math.min(this.firringAttempts.length, (this.page + 1) * this.items_per_page));
  }
}
