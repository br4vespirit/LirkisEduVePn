import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

// TODO: add get also time when each transition was fired
interface FiringAttempt {
  action: string;
  actionFound: boolean;
  successful: boolean;
  actionTargets: string[];
}

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit, OnDestroy{

  firring_attempts_subscription: Subscription = new Subscription();
  // @ts-ignore
  firringAttempts: FiringAttempt[];
  // @ts-ignore
  sessionId: number;

  // TODO: get info about task (task name)
  // TODO: get session duration and if session was successfull or not

  constructor(private _route: ActivatedRoute, private _client: BackendService,) {
    this._route.params.subscribe(params => {
      this.sessionId = params['sessionId'];
    })
  }

  ngOnDestroy(): void {
    this.firring_attempts_subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.firring_attempts_subscription = this._client.getFiringAttempts(this.sessionId).subscribe(data => {
      this.firringAttempts = data as [];
    })
  }


}
