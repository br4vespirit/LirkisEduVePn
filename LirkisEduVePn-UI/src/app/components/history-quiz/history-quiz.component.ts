import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-history-quiz',
  templateUrl: './history-quiz.component.html',
  styleUrls: ['./history-quiz.component.css']
})
export class HistoryQuizComponent {

    constructor(private matDialogRef: MatDialogRef<HistoryQuizComponent>){}

    closeDialog(){
      this.matDialogRef.close();
    }
}
