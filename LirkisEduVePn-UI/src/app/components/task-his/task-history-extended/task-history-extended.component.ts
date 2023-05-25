import {Component, Input, OnDestroy, OnInit} from '@angular/core';

interface FiringAttempt {
  action: string;
  actionFound: boolean;
  successful: boolean;
  actionTargets: string[];
  firedAt: Date;
}

/**
 * Component that is used as extended page with statistics of a task session
 */
@Component({
  selector: 'app-task-history-extended',
  templateUrl: './task-history-extended.component.html',
  styleUrls: ['./task-history-extended.component.css']
})
export class TaskHistoryExtendedComponent implements OnInit, OnDestroy {

  /**
   * List with a firing attempts of a task session
   */
  // @ts-ignore
  @Input() firringAttempts: FiringAttempt[];

  /**
   * List with a current firing attempts on the current page
   */
  current_attempts: FiringAttempt[] = [];

  /**
   * Total pages of the firing attempts
   */
  max_pages: number = 0;

  /**
   * Current page
   */
  page: number = 0;

  /**
   * Items per page
   */
  items_per_page: number = 10;

  /**
   * Method to init max_pages and current_attempts fields
   */
  ngOnInit(): void {
    this.max_pages = Math.ceil(this.firringAttempts.length / this.items_per_page);
    this.current_attempts = this.firringAttempts.slice(0, Math.min(this.firringAttempts.length, this.items_per_page));
  }

  /**
   * Moves to the previous page
   */
  prev_attempts() {
    this.page--;
    this.current_attempts = this.firringAttempts.slice(this.page * this.items_per_page,
      Math.min(this.firringAttempts.length, (this.page + 1) * this.items_per_page));
  }

  /**
   * Moves to the next page
   */
  next_attempts() {
    this.page++;
    this.current_attempts = this.firringAttempts.slice(this.page * this.items_per_page,
      Math.min(this.firringAttempts.length, (this.page + 1) * this.items_per_page));
  }

  ngOnDestroy(): void {
  }
}
