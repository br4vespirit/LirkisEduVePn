import {Component, Input, OnInit} from '@angular/core';

interface FiringAttempt {
  action: string;
  actionFound: boolean;
  successful: boolean;
  actionTargets: string[];
  firedAt: Date;
}

/**
 * Component that is used as basic page with a task session statistics
 */
@Component({
  selector: 'app-task-history-statistics',
  templateUrl: './task-history-statistics.component.html',
  styleUrls: ['./task-history-statistics.component.css']
})
export class TaskHistoryStatisticsComponent implements OnInit {

  /**
   * List with a firing attempts of a task session
   */
  // @ts-ignore
  @Input() firringAttempts: FiringAttempt[];

  /**
   * Total attempts (Amount of firing attempts)
   */
  totalAttempts: number = 0;

  /**
   * Amount of correct attempts
   */
  correctAttempts: number = 0;

  /**
   * Amount of incorrect attempts
   */
  incorrectAttempts: number = 0;

  /**
   * Percentage of correct attempts
   */
  percentage: number = 0;

  /**
   * Method that counts necessary statistics variables
   */
  ngOnInit() {
    this.totalAttempts = this.firringAttempts.length;
    this.firringAttempts.forEach(f => {
      if (f.successful) {
        this.correctAttempts++;
      } else {
        this.incorrectAttempts++;
      }
    })
    this.percentage = this.correctAttempts / this.totalAttempts * 100;
  }
}
