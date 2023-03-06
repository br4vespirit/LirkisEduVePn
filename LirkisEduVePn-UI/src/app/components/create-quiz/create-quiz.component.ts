import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit, OnDestroy {

  scenario_creation_subscription: Subscription = new Subscription();

  // @ts-ignore
  form: FormGroup;

  constructor(private matDialogRef: MatDialogRef<CreateQuizComponent>, private _client: BackendService,
              private _snackBar: MatSnackBar) {
  }

  get name() {
    return this.form.controls['name'];
  }

  get description() {
    return this.form.controls['description'];
  }

  get file() {
    return this.form.controls['file'];
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.scenario_creation_subscription.unsubscribe();
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  onFileSelected(event: any) {
    this.form.patchValue({
      file: event.target.files[0]
    })
  }

  send() {
    const formData = new FormData();
    formData.append("name", this.name.value);
    formData.append("description", this.description.value);
    formData.append('file', this.file.value, this.file.value.name);
    this.scenario_creation_subscription = this._client.saveScenario(formData).subscribe({
      next: () => {
        this.openSuccessfulSnackbar();
      },
      error: (response) => {
        if (response.status === 400) {
          this.openUnsuccessfulSnackbar(response.error);
        } else {
          this.openUnsuccessfulSnackbar("An unexpected error occurred");
        }
      }
    });
  }

  openUnsuccessfulSnackbar(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

  openSuccessfulSnackbar() {
    this._snackBar.open("Scenario was successfully sent to a server", '', {
      duration: 5000,
    });
  }
}
