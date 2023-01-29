import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {
  
  constructor(private matDialogRef:MatDialogRef<CreateQuizComponent>){}

  closeDialog(){
    this.matDialogRef.close();
  }
}
