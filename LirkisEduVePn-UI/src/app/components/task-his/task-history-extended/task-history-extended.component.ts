import {Component, Input, OnDestroy, OnInit} from '@angular/core';

interface FiringAttempt {
  action: string;
  actionFound: boolean;
  successful: boolean;
  actionTargets: string[];
  firedAt: Date;
}

@Component({
  selector: 'app-task-history-extended',
  templateUrl: './task-history-extended.component.html',
  styleUrls: ['./task-history-extended.component.css']
})
export class TaskHistoryExtendedComponent implements OnInit, OnDestroy {

  // @ts-ignore
  @Input() firringAttempts: FiringAttempt[];
  current_attempts: FiringAttempt[] = [];
  max_pages: number = 0;
  page: number = 0;
  items_per_page: number = 10;

  ngOnInit(): void {
    this.max_pages = Math.ceil(this.firringAttempts.length / this.items_per_page);
    this.current_attempts = this.firringAttempts.slice(0, Math.min(this.firringAttempts.length, this.items_per_page));
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

  ngOnDestroy(): void {
  }
}
