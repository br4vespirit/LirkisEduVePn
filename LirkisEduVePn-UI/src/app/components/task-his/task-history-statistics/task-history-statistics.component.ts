import {Component, Input, OnInit} from '@angular/core';

interface FiringAttempt {
  action: string;
  actionFound: boolean;
  successful: boolean;
  actionTargets: string[];
  firedAt: Date;
}

@Component({
  selector: 'app-task-history-statistics',
  templateUrl: './task-history-statistics.component.html',
  styleUrls: ['./task-history-statistics.component.css']
})
export class TaskHistoryStatisticsComponent implements OnInit {

  // @ts-ignore
  @Input() firringAttempts: FiringAttempt[];

  totalAttempts: number = 0;
  correctAttempts: number = 0;
  incorrectAttempts: number = 0;
  percentage: number = 0;

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
