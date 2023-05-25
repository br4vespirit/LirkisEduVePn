import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../../services/backend.service";
import {Router} from "@angular/router";
import {TaskSessionInfo} from "../../../models/task-session-info.model";
import {Subscription} from "rxjs";

/**
 * Object that defines actions of user in tasks
 */
interface FiringAttempt {
  action: string;
  actionFound: boolean;
  successful: boolean;
  actionTargets: string[];
  firedAt: Date;
}

/**
 * Component that is used as a page contains history of a completed task
 */
@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit, OnDestroy {

  /**
   * List of firing attempts
   */
  // @ts-ignore
  firringAttempts: FiringAttempt[];

  /**
   * Subscription to fetch firing attempts of a current task session
   */
  firring_attempts_subscription: Subscription = new Subscription();
  // @ts-ignore

  /**
   * Information about completed session
   */
  sessionData: TaskSessionInfo;

  /**
   * Duration of a session
   */
  duration: string = "";

  /**
   * Whether extended page of a session was open
   */
  extended_open: boolean = false;

  /**
   * Whether data was already loaded
   */
  loaded: boolean = false;

  /**
   * Contains information from which component this component was opened
   */
  from: string = "";

  /**
   * Constructor for a component
   * @param _client BackendService instance that sends requests to a server
   * @param router Router field to route between components
   */
  constructor(private router: Router, private _client: BackendService,) {
    // @ts-ignore
    this.sessionData = this.router.getCurrentNavigation().extras.state.data as TaskSessionInfo;
    // @ts-ignore
    this.from = this.router.getCurrentNavigation().extras.state.from as string;
    this.countDuration()
  }

  /**
   * Method that fetch firing attempts of a current session
   */
  ngOnInit(): void {
    this.firring_attempts_subscription = this._client.getFiringAttempts(this.sessionData.id).subscribe(data => {
      this.firringAttempts = data as [];
      this.loaded = true;
    })
  }

  /**
   * Method to count duration of a session from milliseconds to a "hh:MM:ss" format
   */
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

  /**
   * Changes status whether extended statistics was opened or not
   */
  change_status() {
    this.extended_open = !this.extended_open;
  }

  /**
   * Close current page and redirects to the previous one depends on "from" field
   */
  close() {
    if (this.from === 'profile') {
      this.router.navigate(["/user/profile"]).then();
    } else if (this.from === 'dashboard') {
      this.router.navigate(["/dashboard/groups-history"]).then();
    }
  }
}
