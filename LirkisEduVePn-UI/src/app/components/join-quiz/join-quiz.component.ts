import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-quiz',
  templateUrl: './join-quiz.component.html',
  styleUrls: ['./join-quiz.component.css']
})

export class JoinQuizComponent {

  constructor(private matDialogRef:MatDialogRef<JoinQuizComponent>){}

  closeDialog(){
    this.matDialogRef.close();
  }
}
